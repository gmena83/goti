import { supabase } from '@/lib/supabase';

export interface Metrics {
    totalConversations: number;
    totalMessages: number;
    linesOfCode: number;
    bugsFound: number;
    hoursVibecoding: number;
    trackedTools: number;
}

export async function getMetrics(): Promise<Metrics> {
    try {
        // Get total conversations
        const { count: conversationCount } = await supabase
            .from('conversations')
            .select('*', { count: 'exact', head: true });

        // Get total messages
        const { count: messageCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true });

        // Get all messages to analyze content
        const { data: messages } = await supabase
            .from('messages')
            .select('content, role')
            .eq('role', 'assistant');

        // Calculate code metrics from messages
        let linesOfCode = 0;
        let bugsFound = 0;

        if (messages) {
            messages.forEach((msg) => {
                // Count code blocks (lines between ```)
                const codeBlocks = msg.content.match(/```[\s\S]*?```/g) || [];
                codeBlocks.forEach((block: string) => {
                    const lines = block.split('\n').length - 2; // Exclude ``` lines
                    linesOfCode += Math.max(0, lines);
                });

                // Count bug mentions
                const bugKeywords = /\b(bug|error|fix|issue|problem|exception)\b/gi;
                const bugMatches = msg.content.match(bugKeywords) || [];
                bugsFound += bugMatches.length;
            });
        }

        // Calculate hours (estimate: 1 hour per 10 messages)
        const hoursVibecoding = Math.floor((messageCount || 0) / 10);

        // Tracked tools (fixed number for now)
        const trackedTools = 12;

        return {
            totalConversations: conversationCount || 0,
            totalMessages: messageCount || 0,
            linesOfCode,
            bugsFound,
            hoursVibecoding,
            trackedTools,
        };
    } catch (error) {
        console.error('Error fetching metrics:', error);
        // Return default metrics on error
        return {
            totalConversations: 0,
            totalMessages: 0,
            linesOfCode: 0,
            bugsFound: 0,
            hoursVibecoding: 0,
            trackedTools: 12,
        };
    }
}
