'use client';

import { useState, useEffect } from 'react';
import { Code, Bug, Rocket, Clock, MessageSquare, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Metric {
    icon: React.ReactNode;
    value: string;
    label: string;
    color: string;
}

interface MetricsData {
    totalConversations: number;
    totalMessages: number;
    linesOfCode: number;
    bugsFound: number;
    hoursVibecoding: number;
    trackedTools: number;
    apiCalls: number;
    tokensUsed: number;
    interactions: number;
}

export default function MetricsBar() {
    const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const response = await fetch('/api/metrics');
                if (response.ok) {
                    const data = await response.json();
                    setMetricsData(data);
                }
            } catch (error) {
                console.error('Error fetching metrics:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchMetrics();
    }, []);

    const metrics: Metric[] = [
        {
            icon: <Rocket size={20} />,
            value: loading ? '...' : String(metricsData?.apiCalls || 0),
            label: 'API Calls',
            color: 'text-green-400',
        },
        {
            icon: <MessageSquare size={20} />,
            value: loading ? '...' : String(metricsData?.tokensUsed?.toLocaleString() || '0'),
            label: 'Tokens Used',
            color: 'text-pink-400',
        },
        {
            icon: <Eye size={20} />,
            value: loading ? '...' : String(metricsData?.interactions?.toLocaleString() || '0'),
            label: 'Interactions',
            color: 'text-cyan-400',
        },
        {
            icon: <Clock size={20} />,
            value: loading ? '...' : String(metricsData?.hoursVibecoding || 0),
            label: 'Hours Vibecoding',
            color: 'text-purple-400',
        },
        {
            icon: <Code size={20} />,
            value: loading ? '...' : metricsData?.linesOfCode.toLocaleString() || '0',
            label: 'Lines of Code',
            color: 'text-blue-400',
        },
        {
            icon: <Bug size={20} />,
            value: loading ? '...' : String(metricsData?.bugsFound || 0),
            label: 'Bugs Found',
            color: 'text-red-400',
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
