'use client';

import { useState, useCallback } from 'react';
import Chat from './chat';
import SidebarNav from './sidebar-nav';
import MetricsBar from './metrics-bar';
import ToolWatchPanel from './tool-watch-panel';
import AppLayout from './app-layout';

export type ViewType = 'chat' | 'library' | 'toolwatch';

export default function HomeClient() {
    const [currentView, setCurrentView] = useState<ViewType>('chat');
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    const handleNewChat = useCallback(() => {
        setSelectedChatId(null);
        setCurrentView('chat');
    }, []);

    const handleViewChange = useCallback((view: ViewType) => {
        setCurrentView(view);
    }, []);

    const handleChatSelect = useCallback((chatId: string) => {
        setSelectedChatId(chatId);
        setCurrentView('chat');
    }, []);

    return (
        <AppLayout
            sidebar={
                <SidebarNav
                    onNewChat={handleNewChat}
                    onViewChange={handleViewChange}
                    onChatSelect={handleChatSelect}
                    currentView={currentView}
                />
            }
            toolWatch={<ToolWatchPanel />}
        >
            <MetricsBar />
            <div className="flex-1 overflow-hidden">
                {currentView === 'chat' && <Chat />}
                {currentView === 'library' && (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center p-8">
                            <h2 className="text-2xl font-bold mb-4">Knowledge Library</h2>
                            <p className="text-muted-foreground mb-4">
                                Manage your documents and knowledge base.
                            </p>
                            <a
                                href="/knowledge"
                                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Open Full Library →
                            </a>
                        </div>
                    </div>
                )}
                {currentView === 'toolwatch' && (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center p-8">
                            <h2 className="text-2xl font-bold mb-4">Tool Watch</h2>
                            <p className="text-muted-foreground">
                                Tool updates are displayed in the right panel.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
