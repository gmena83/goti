'use client';

import { Code, Bug, Rocket, Clock, MessageSquare, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Metric {
    icon: React.ReactNode;
    value: string;
    label: string;
    color: string;
}

export default function MetricsBar() {
    const metrics: Metric[] = [
        {
            icon: <Code size={20} />,
            value: '12,847',
            label: 'Lines of Code',
            color: 'text-blue-400',
        },
        {
            icon: <Bug size={20} />,
            value: '47',
            label: 'Bugs Found',
            color: 'text-red-400',
        },
        {
            icon: <Rocket size={20} />,
            value: '3',
            label: 'Payloads Shipped',
            color: 'text-green-400',
        },
        {
            icon: <Clock size={20} />,
            value: '156',
            label: 'Hours Vibecoding',
            color: 'text-purple-400',
        },
        {
            icon: <MessageSquare size={20} />,
            value: '89',
            label: 'Conversations',
            color: 'text-pink-400',
        },
        {
            icon: <Eye size={20} />,
            value: '12',
            label: 'Tracked',
            color: 'text-cyan-400',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 border-b border-border">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="glass rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <div className={cn('flex-shrink-0', metric.color)}>
                            {metric.icon}
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                        {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {metric.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
