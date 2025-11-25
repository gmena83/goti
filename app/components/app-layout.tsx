'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
    toolWatch: ReactNode;
}

export default function AppLayout({ children, sidebar, toolWatch }: AppLayoutProps) {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background flex">
            {/* Left Sidebar */}
            <aside className="w-60 h-full border-r border-sidebar-border bg-sidebar flex-shrink-0 hidden md:flex flex-col">
                {sidebar}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-hidden flex flex-col">
                {children}
            </main>

            {/* Right Tool Watch Panel */}
            <aside className="w-80 h-full border-l border-sidebar-border bg-sidebar flex-shrink-0 hidden lg:flex flex-col">
                {toolWatch}
            </aside>
        </div>
    );
}
