import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get document with chunks
        const { data: document, error: docError } = await supabase
            .from('documents')
            .select('*')
            .eq('id', id)
            .single();

        if (docError) {
            return NextResponse.json({ error: docError.message }, { status: 404 });
        }

        // Get associated chunks
        const { data: chunks, error: chunksError } = await supabase
            .from('document_chunks')
            .select('id, content, metadata, created_at')
            .eq('document_id', id)
            .order('created_at', { ascending: true });

        if (chunksError) {
            console.error('Error fetching chunks:', chunksError);
        }

        return NextResponse.json({
            document,
            chunks: chunks || [],
            chunksCount: chunks?.length || 0
        });
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
