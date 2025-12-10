'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Bot,
    GitPullRequest,
    Play,
    CheckCircle2,
    XCircle,
    Clock,
    Loader2,
    RefreshCw,
    ChevronDown,
    ChevronRight,
    Sparkles,
    AlertCircle
} from 'lucide-react';

interface JulesSession {
    name: string;
    title?: string;
    prompt: string;
    status: string;
    createTime?: string;
    updateTime?: string;
    pullRequestUri?: string;
    plan?: {
        description?: string;
        steps?: Array<{ description: string; status?: string }>;
    };
}

interface JulesSource {
    name: string;
    displayName?: string;
    githubRepoUri?: string;
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    INITIALIZING: { icon: <Loader2 size={14} className="animate-spin" />, color: 'text-blue-400', label: 'Initializing' },
    GENERATING_PLAN: { icon: <Sparkles size={14} />, color: 'text-purple-400', label: 'Planning' },
    WAITING_FOR_PLAN_APPROVAL: { icon: <AlertCircle size={14} />, color: 'text-yellow-400', label: 'Awaiting Approval' },
    EXECUTING: { icon: <Play size={14} />, color: 'text-green-400', label: 'Executing' },
    WAITING_FOR_USER_INPUT: { icon: <Clock size={14} />, color: 'text-orange-400', label: 'Needs Input' },
    COMPLETED: { icon: <CheckCircle2 size={14} />, color: 'text-green-500', label: 'Completed' },
    FAILED: { icon: <XCircle size={14} />, color: 'text-red-500', label: 'Failed' },
    CANCELLED: { icon: <XCircle size={14} />, color: 'text-gray-500', label: 'Cancelled' },
};

export default function JulesPanel() {
    const [sessions, setSessions] = useState<JulesSession[]>([]);
    const [sources, setSources] = useState<JulesSource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedSession, setExpandedSession] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [newTaskPrompt, setNewTaskPrompt] = useState('');
    const [selectedSource, setSelectedSource] = useState<string>('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [sessionsRes, sourcesRes] = await Promise.all([
                fetch('/api/jules/sessions'),
                fetch('/api/jules/sources')
            ]);

            if (!sessionsRes.ok || !sourcesRes.ok) {
                throw new Error('Failed to fetch Jules data');
            }

            const sessionsData = await sessionsRes.json();
            const sourcesData = await sourcesRes.json();

            setSessions(sessionsData.sessions || []);
            setSources(sourcesData.sources || []);

            // Auto-select first source if available
            if (sourcesData.sources?.length > 0 && !selectedSource) {
                setSelectedSource(sourcesData.sources[0].name);
            }
        } catch (err) {
            console.error('Error fetching Jules data:', err);
            setError(err instanceof Error ? err.message : 'Unable to load Jules data');
        } finally {
            setLoading(false);
        }
    }, [selectedSource]);

    useEffect(() => {
        fetchData();
        // Poll every 30 seconds for updates
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const createSession = async () => {
        if (!newTaskPrompt.trim() || !selectedSource) return;

        setCreating(true);
        try {
            const response = await fetch('/api/jules/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: newTaskPrompt,
                    source: selectedSource,
                    requirePlanApproval: true
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create session');
            }

            setNewTaskPrompt('');
            await fetchData();
        } catch (err) {
            console.error('Error creating session:', err);
            setError(err instanceof Error ? err.message : 'Failed to create task');
        } finally {
            setCreating(false);
        }
    };

    const approveSession = async (sessionName: string) => {
        try {
            const id = sessionName.replace('sessions/', '');
            const response = await fetch(`/api/jules/sessions/${id}?action=approve`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to approve session');
            }

            await fetchData();
        } catch (err) {
            console.error('Error approving session:', err);
        }
    };

    const getStatusConfig = (status: string) => {
        return STATUS_CONFIG[status] || { icon: <Clock size={14} />, color: 'text-gray-400', label: status };
    };

    const formatTime = (isoString?: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                        <Bot size={20} className="text-primary" />
                        <h2 className="text-lg font-bold text-sidebar-foreground">Jules Agent</h2>
                    </div>
                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors disabled:opacity-50"
                        title="Refresh"
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
                <p className="text-xs text-muted-foreground">Autonomous AI coding sessions</p>
            </div>

            {/* New Task Form */}
            <div className="p-4 border-b border-sidebar-border space-y-3">
                <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-sidebar-accent border border-sidebar-border text-sidebar-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Select repository"
                >
                    <option value="">Select repository...</option>
                    {sources.map((source) => (
                        <option key={source.name} value={source.name}>
                            {source.displayName || source.name.replace('sources/github/', '')}
                        </option>
                    ))}
                </select>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newTaskPrompt}
                        onChange={(e) => setNewTaskPrompt(e.target.value)}
                        placeholder="Describe coding task..."
                        className="flex-1 px-3 py-2 text-sm rounded-lg bg-sidebar-accent border border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        onKeyDown={(e) => e.key === 'Enter' && createSession()}
                    />
                    <button
                        onClick={createSession}
                        disabled={creating || !newTaskPrompt.trim() || !selectedSource}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {creating ? <Loader2 size={16} className="animate-spin" /> : 'Create'}
                    </button>
                </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                {loading && sessions.length === 0 ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                ) : error ? (
                    <div className="text-center text-muted-foreground py-8">
                        <AlertCircle size={24} className="mx-auto mb-2 text-red-400" />
                        <p>{error}</p>
                        <button
                            onClick={fetchData}
                            className="mt-2 text-primary hover:underline text-sm"
                        >
                            Try again
                        </button>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        <Bot size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No active sessions</p>
                        <p className="text-xs mt-1">Create a task above to get started</p>
                    </div>
                ) : (
                    sessions.map((session) => {
                        const statusConfig = getStatusConfig(session.status);
                        const isExpanded = expandedSession === session.name;

                        return (
                            <div
                                key={session.name}
                                className="glass rounded-lg overflow-hidden animate-fade-in"
                            >
                                <div
                                    className="p-4 cursor-pointer hover:bg-sidebar-accent/50 transition-colors"
                                    onClick={() => setExpandedSession(isExpanded ? null : session.name)}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className={`flex-shrink-0 mt-0.5 ${statusConfig.color}`}>
                                            {statusConfig.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-sm font-semibold text-foreground truncate">
                                                    {session.title || session.prompt.slice(0, 40)}...
                                                </h3>
                                                <div className="flex items-center space-x-2">
                                                    {session.pullRequestUri && (
                                                        <a
                                                            href={session.pullRequestUri}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:opacity-80"
                                                            onClick={(e) => e.stopPropagation()}
                                                            title="View Pull Request"
                                                        >
                                                            <GitPullRequest size={16} />
                                                        </a>
                                                    )}
                                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs">
                                                <span className={`font-medium ${statusConfig.color}`}>
                                                    {statusConfig.label}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {formatTime(session.updateTime || session.createTime)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 pt-0 space-y-3 border-t border-sidebar-border/50">
                                        <div className="pt-3">
                                            <p className="text-xs text-muted-foreground mb-2">Task:</p>
                                            <p className="text-sm text-sidebar-foreground">{session.prompt}</p>
                                        </div>

                                        {session.plan?.steps && session.plan.steps.length > 0 && (
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-2">Plan:</p>
                                                <ul className="space-y-1">
                                                    {session.plan.steps.map((step, i) => (
                                                        <li key={i} className="flex items-start space-x-2 text-xs">
                                                            <span className="text-muted-foreground">{i + 1}.</span>
                                                            <span className="text-sidebar-foreground">{step.description}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {session.status === 'WAITING_FOR_PLAN_APPROVAL' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    approveSession(session.name);
                                                }}
                                                className="w-full py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-500 transition-colors"
                                            >
                                                Approve Plan
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-sidebar-border text-center">
                <a
                    href="https://jules.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                    Powered by Google Jules
                </a>
            </div>
        </div>
    );
}
