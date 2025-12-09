'use client';

import { Plus, Library, Eye, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewType } from './home-client';

interface SidebarNavProps {
    onNewChat?: () => void;
    onViewChange?: (view: ViewType) => void;
    onChatSelect?: (chatId: string) => void;
    currentView?: ViewType;
}

export default function SidebarNav({ onNewChat, onViewChange, onChatSelect, currentView = 'chat' }: SidebarNavProps) {
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
                    <span className="font-medium">New Chat</span>
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

            {/* Conversation History */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
                {/* TODAY */}
                <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-3">Today</h3>
                    <div className="space-y-1">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm transition-colors truncate">
                            React 19 Migration Guide
                        </button>
                    </div>
                </div>

                {/* YESTERDAY */}
                <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-3">Yesterday</h3>
                    <div className="space-y-1">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm transition-colors truncate">
                            TypeScript Utility Types
                        </button>
                    </div>
                </div>

                {/* OLDER */}
                <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-3">Older</h3>
                    <div className="space-y-1">
                        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm transition-colors truncate">
                            Next.js App Router Best Practices
                        </button>
                    </div>
                </div>
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
                        <button className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors">
                            <Settings size={16} className="text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors">
                            <LogOut size={16} className="text-muted-foreground" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
