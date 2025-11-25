import { ReactNode } from 'react';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    thinking?: string[];
    timestamp?: Date;
}

export const quickStarters = [
    "Explain the latest React updates",
    "Help me refactor this codebase",
    "Break down Server Components",
    "Debug this TypeScript error"
];

export const mockConversations = [
    {
        id: '1',
        title: 'React Server Components',
        date: new Date(),
        messages: [] as Message[]
    },
    {
        id: '2',
        title: 'Next.js Routing',
        date: new Date(Date.now() - 86400000), // Yesterday
        messages: [] as Message[]
    },
    {
        id: '3',
        title: 'Supabase Auth',
        date: new Date(Date.now() - 172800000), // 2 days ago
        messages: [] as Message[]
    }
];

export const mockToolUpdates = [
    {
        id: '1',
        tool: 'Next.js',
        version: '14.1.0',
        summary: 'Improved performance and stability.',
        date: new Date(),
        icon: '▲'
    },
    {
        id: '2',
        tool: 'Supabase',
        version: '2.39.0',
        summary: 'New authentication features.',
        date: new Date(Date.now() - 86400000),
        icon: '⚡'
    }
];
