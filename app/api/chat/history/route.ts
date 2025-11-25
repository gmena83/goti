import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { getOrCreateChatSession } from '../../../../lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        // Get the current session's chat ID
        const chatId = await getOrCreateChatSession();

        // Fetch messages for this chat session
        const { data: messages, error } = await supabase
            .from('messages')
            .select('id, role, content, created_at')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching chat history:', error);
            return NextResponse.json(
                { error: 'Failed to fetch chat history', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            messages: messages || [],
            chatId,
        });
    } catch (error) {
        console.error('Error in chat history endpoint:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
