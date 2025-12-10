'use client';

import { useState, useEffect } from 'react';
import { Zap, Database, Brain, Triangle, Code2, Palette, Loader2, RefreshCw, Code } from 'lucide-react';

interface ToolUpdate {
    id: string;
    name: string;
    version: string;
    description: string;
    timeAgo: string;
    icon: string;
    color: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
    triangle: <Triangle size={20} />,
    database: <Database size={20} />,
    brain: <Brain size={20} />,
    code2: <Code2 size={20} />,
    code: <Code size={20} />,
    palette: <Palette size={20} />,
};

export default function ToolWatchPanel() {
    const [toolUpdates, setToolUpdates] = useState<ToolUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUpdates = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/tool-watch');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setToolUpdates(data.updates || []);
        } catch (err) {
            console.error('Error fetching tool updates:', err);
            setError('Unable to load updates');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, []);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                        <Zap size={20} className="text-primary" />
                        <h2 className="text-lg font-bold text-sidebar-foreground">Tool Watch</h2>
                    </div>
                    <button
                        onClick={fetchUpdates}
                        disabled={loading}
                        className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors disabled:opacity-50"
                        title="Refresh"
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
                <p className="text-xs text-muted-foreground">Latest updates from your tech stack</p>
            </div>

            {/* Tool Updates List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                ) : error ? (
                    <div className="text-center text-muted-foreground py-8">
                        <p>{error}</p>
                        <button
                            onClick={fetchUpdates}
                            className="mt-2 text-primary hover:underline text-sm"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    toolUpdates.map((tool, index) => (
                        <div
                            key={tool.id}
                            className="glass rounded-lg p-4 hover:scale-[1.02] transition-all cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 ${tool.color}`}>
                                    {ICON_MAP[tool.icon] || <Code2 size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-sm font-semibold text-foreground">{tool.name}</h3>
                                        <span className="text-xs font-medium text-foreground bg-muted px-2 py-0.5 rounded border border-border">
                                            {tool.version}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                        {tool.description}
                                    </p>
                                    <span className="text-xs text-muted-foreground">{tool.timeAgo}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Configure Button */}
            <div className="p-4 border-t border-sidebar-border">
                <button className="w-full py-2.5 px-4 rounded-lg border border-border hover:bg-sidebar-accent text-sidebar-foreground text-sm font-medium transition-colors">
                    Configure Watch List
                </button>
            </div>
        </div>
    );
}

