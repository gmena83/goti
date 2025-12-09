import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '5');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Fetch conversations ordered by most recent
        const { data: chats, error, count } = await supabase
            .from('chats')
            .select('id, title, created_at', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching conversations:', error);
            return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
        }

        return NextResponse.json({
            conversations: chats || [],
            total: count || 0,
            hasMore: (count || 0) > offset + limit
        });
    } catch (error) {
        console.error('Error in conversations API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
