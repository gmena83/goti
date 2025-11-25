import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('documents')
            .select('id, title, source, created_at, updated_at, metadata')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching documents:', error);
            return NextResponse.json(
                { error: 'Failed to fetch documents', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ documents: data || [] });
    } catch (error) {
        console.error('Error in documents list:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
