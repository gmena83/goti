'use client';

import { Zap, Database, Brain, Triangle, Code2 } from 'lucide-react';

interface ToolUpdate {
    id: string;
    name: string;
    version: string;
    description: string;
    timeAgo: string;
    icon: React.ReactNode;
    color: string;
}

export default function ToolWatchPanel() {
    const toolUpdates: ToolUpdate[] = [
        {
            id: '1',
            name: 'Next.js',
            version: '14.2.0',
            description: 'Improved turbopack performance and new caching strategies',
            timeAgo: '1 day ago',
            icon: <Triangle size={20} />,
            color: 'text-orange-400',
        },
        {
            id: '2',
            name: 'Supabase',
            version: '2.38.0',
            description: 'Vector database updates and edge function improvements',
            timeAgo: '2 days ago',
            icon: <Database size={20} />,
            color: 'text-green-400',
        },
        {
            id: '3',
            name: 'OpenAI',
            version: 'GPT-4 Turbo',
            description: 'Enhanced context window and improved reasoning capabilities',
            timeAgo: '3 days ago',
            icon: <Brain size={20} />,
            color: 'text-purple-400',
        },
        {
            id: '4',
            name: 'Vercel',
            version: 'Platform Update',
            description: 'New deployment analytics and performance insights',
            timeAgo: '4 days ago',
            icon: <Triangle size={20} />,
            color: 'text-blue-400',
        },
        {
            id: '5',
            name: 'TypeScript',
            version: '5.4.0',
            description: 'NoInfer utility type and improved type inference',
            timeAgo: '5 days ago',
            icon: <Code2 size={20} />,
            color: 'text-cyan-400',
        },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-sidebar-border">
                <div className="flex items-center space-x-2 mb-1">
                    <Zap size={20} className="text-primary" />
                    <h2 className="text-lg font-bold text-sidebar-foreground">Tool Watch</h2>
                </div>
                <p className="text-xs text-muted-foreground">Latest updates from your tech stack</p>
            </div>

            {/* Tool Updates List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                {toolUpdates.map((tool, index) => (
                    <div
                        key={tool.id}
                        className="glass rounded-lg p-4 hover:scale-[1.02] transition-all cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 ${tool.color}`}>
                                {tool.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-semibold text-foreground">{tool.name}</h3>
                                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
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
                ))}
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
