'use client';

import { useState, useEffect } from 'react';
import { Plus, Library, Eye, Settings, LogOut, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewType } from './home-client';

interface Conversation {
    id: string;
    title: string;
    created_at: string;
}

interface SidebarNavProps {
    onNewChat?: () => void;
    onViewChange?: (view: ViewType) => void;
    onChatSelect?: (chatId: string) => void;
    currentView?: ViewType;
    currentChatId?: string | null;
    onShowAllProjects?: () => void;
}

export default function SidebarNav({
    onNewChat,
    onViewChange,
    onChatSelect,
    currentView = 'chat',
    currentChatId,
    onShowAllProjects
}: SidebarNavProps) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

    const fetchConversations = async () => {
        try {
            const response = await fetch('/api/chat/conversations?limit=5');
            if (response.ok) {
                const data = await response.json();
                setConversations(data.conversations || []);
                setHasMore(data.hasMore || false);
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    // Listen for refresh events from Chat component
    useEffect(() => {
        const handleRefresh = () => {
            fetchConversations();
        };
        window.addEventListener('refreshConversations', handleRefresh);
        return () => window.removeEventListener('refreshConversations', handleRefresh);
    }, []);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">G</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-sidebar-foreground">GOTI</h1>
                        <p className="text-xs text-muted-foreground">Generative Orchestrator of Technological Innovation</p>
                    </div>
                </div>

                {/* New Chat Button */}
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 py-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus size={18} />
                    <span className="font-medium">New Project</span>
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="px-3 py-2 space-y-1">
                <button
                    onClick={() => onViewChange?.('library')}
                    className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                        currentView === 'library'
                            ? "bg-sidebar-accent text-sidebar-foreground"
                            : "hover:bg-sidebar-accent text-sidebar-foreground"
                    )}
                >
                    <Library size={18} />
                    <span className="text-sm">Library</span>
                </button>
                <button
                    onClick={() => onViewChange?.('toolwatch')}
                    className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                        currentView === 'toolwatch'
                            ? "bg-sidebar-accent text-sidebar-foreground"
                            : "hover:bg-sidebar-accent text-sidebar-foreground"
                    )}
                >
                    <Eye size={18} />
                    <span className="text-sm">Tool Watch</span>
                </button>
            </nav>

            {/* Recent Projects */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-3">Recent Projects</h3>

                {loading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 size={18} className="animate-spin text-muted-foreground" />
                    </div>
                ) : conversations.length === 0 ? (
                    <p className="text-xs text-muted-foreground px-3 py-2">No projects yet. Start a new one!</p>
                ) : (
                    <div className="space-y-1">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => onChatSelect?.(conv.id)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate flex items-center gap-2",
                                    currentChatId === conv.id
                                        ? "bg-sidebar-accent text-sidebar-foreground"
                                        : "hover:bg-sidebar-accent text-sidebar-foreground"
                                )}
                            >
                                <MessageSquare size={14} className="flex-shrink-0 text-muted-foreground" />
                                <span className="truncate">{conv.title || 'Untitled Project'}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Older Projects Button */}
                {hasMore && (
                    <button
                        onClick={onShowAllProjects}
                        className="w-full flex items-center justify-between px-3 py-2 mt-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                    >
                        <span>Older Projects</span>
                        <ChevronRight size={16} />
                    </button>
                )}
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground text-xs font-medium">U</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-sidebar-foreground truncate">gonzalo@menatech.cloud</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors" title="Settings">
                            <Settings size={16} className="text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors" title="Log out">
                            <LogOut size={16} className="text-muted-foreground" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

