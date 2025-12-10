'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface QuickActionCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    onClick?: () => void;
}

const QuickActionCard = React.memo(function QuickActionCard({ icon: Icon, title, description, onClick }: QuickActionCardProps) {
    return (
        <button
            onClick={onClick}
            className="glass rounded-lg p-6 text-left hover:scale-[1.02] transition-all group cursor-pointer"
        >
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon size={20} className="text-primary" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </div>
        </button>
    );
}
