'use client';

import { useState, useCallback } from 'react';
import Chat from './chat';
import SidebarNav from './sidebar-nav';
import MetricsBar from './metrics-bar';
import ToolWatchPanel from './tool-watch-panel';
import AppLayout from './app-layout';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ViewType = 'chat' | 'library' | 'toolwatch';

export default function HomeClient() {
    const [currentView, setCurrentView] = useState<ViewType>('chat');
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [pendingNewProject, setPendingNewProject] = useState(false);

    const handleNewChat = useCallback(() => {
        // Show project naming modal
        setShowNewProjectModal(true);
        setNewProjectName('');
    }, []);

    const handleCreateProject = useCallback(() => {
        if (!newProjectName.trim()) return;
        // Store name for Chat to use when creating the chat session
        setPendingNewProject(true);
        setCurrentChatId(null);
        setCurrentView('chat');
        setShowNewProjectModal(false);
        // The Chat component will use pendingNewProject to set the title
    }, [newProjectName]);

    const handleViewChange = useCallback((view: ViewType) => {
        setCurrentView(view);
    }, []);

    const handleChatSelect = useCallback((chatId: string) => {
        setCurrentChatId(chatId);
        setCurrentView('chat');
        setPendingNewProject(false);
    }, []);

    const handleShowAllProjects = useCallback(() => {
        // Future: Open modal or navigate to full projects page
    }, []);

    return (
        <>
            <AppLayout
                sidebar={
                    <SidebarNav
                        onNewChat={handleNewChat}
                        onViewChange={handleViewChange}
                        onChatSelect={handleChatSelect}
                        currentView={currentView}
                        currentChatId={currentChatId}
                        onShowAllProjects={handleShowAllProjects}
                    />
                }
                toolWatch={<ToolWatchPanel />}
            >
                <MetricsBar />
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentView}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="h-full"
                        >
                            {currentView === 'chat' && (
                                <Chat
                                    chatId={currentChatId}
                                    projectName={pendingNewProject ? newProjectName : undefined}
                                    onChatCreated={(id: string) => {
                                        setCurrentChatId(id);
                                        setPendingNewProject(false);
                                    }}
                                />
                            )}
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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </AppLayout>

            {/* New Project Modal */}
            <AnimatePresence>
                {showNewProjectModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="glass-strong rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 border-2 border-glass-border/20"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gradient">New Project</h2>
                                <button
                                    onClick={() => setShowNewProjectModal(false)}
                                    className="p-1 hover:bg-glass-border/10 rounded-lg transition-colors"
                                    title="Close"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Give your project a name to help you find it later.
                            </p>
                            <input
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                                placeholder="e.g., guIA Newsletter Workflow"
                                className="w-full px-3 py-2 border border-glass-border/20 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary mb-4 transition-all"
                                autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => setShowNewProjectModal(false)}
                                    className="px-4 py-2 text-sm hover:bg-glass-border/10 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateProject}
                                    disabled={!newProjectName.trim()}
                                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    Create Project
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

