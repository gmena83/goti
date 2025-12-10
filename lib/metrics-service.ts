import { supabase } from '@/lib/supabase';

export interface Metrics {
    totalConversations: number;
    totalMessages: number;
    linesOfCode: number;
    bugsFound: number;
    hoursVibecoding: number;
    trackedTools: number;
    tokensUsed: number;
    interactions: number;
    apiCalls: number;
}

export async function getMetrics(): Promise<Metrics> {
    try {
        // Get total conversations (chats)
        const { count: conversationCount } = await supabase
            .from('chats')
            .select('*', { count: 'exact', head: true });

        // Get total messages
        const { count: messageCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true });

        // Get all messages to analyze content
        const { data: messages } = await supabase
            .from('messages')
            .select('content, role')
            .eq('role', 'assistant')
            .order('created_at', { ascending: false })
            .limit(500); // Limit analysis to recent messages to prevent OOM

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

        // Calculate token usage (approximation: 4 chars per token)
        let totalChars = 0;

        // precise token count isn't stored, so we estimate from message content
        if (messages) { // This uses the sample 500 messages, but for total we might need better approach. 
            // For now, let's extrapolate average length * total count
            // Get average length of recent messages
            const recentChars = messages.reduce((acc, msg) => acc + msg.content.length, 0);
            const avgLength = messages.length > 0 ? recentChars / messages.length : 100;
            totalChars = (messageCount || 0) * avgLength;
        }

        const tokensUsed = Math.floor(totalChars / 4);

        // Interactions = user messages (approx half of total, or strictly count if we check user role)
        // Let's assume interactions is total message pairs, so totalMessages / 2
        const interactions = Math.floor((messageCount || 0) / 2);

        // API Calls = Conversations
        const apiCalls = conversationCount || 0;

        return {
            totalConversations: conversationCount || 0,
            totalMessages: messageCount || 0,
            linesOfCode,
            bugsFound,
            hoursVibecoding,
            trackedTools,
            tokensUsed,
            interactions,
            apiCalls
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
            tokensUsed: 0,
            interactions: 0,
            apiCalls: 0
        };
    }
}
