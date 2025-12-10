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
        <div className="h-screen w-screen overflow-hidden bg-transparent flex p-4 gap-4">
            {/* Left Sidebar */}
            <aside className="w-60 h-full glass rounded-2xl flex-shrink-0 hidden md:flex flex-col">
                {sidebar}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-hidden flex flex-col glass rounded-2xl">
                {children}
            </main>

            {/* Right Tool Watch Panel */}
            <aside className="w-80 h-full glass rounded-2xl flex-shrink-0 hidden lg:flex flex-col">
                {toolWatch}
            </aside>
        </div>
    );
}
