import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(req: NextRequest) {
    try {
        // Check if tables exist by querying them
        const { data: documents, error: docError } = await supabase
            .from('documents')
            .select('count');

        const { data: chunks, error: chunkError } = await supabase
            .from('document_chunks')
            .select('count');

        if (docError || chunkError) {
            return NextResponse.json({
                status: 'error',
                message: 'Database tables not found or not accessible',
                errors: {
                    documents: docError?.message,
                    chunks: chunkError?.message,
                },
            });
        }

        return NextResponse.json({
            status: 'ok',
            message: 'RAG system is ready',
            tables: {
                documents: 'accessible',
                document_chunks: 'accessible',
            },
        });
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'Health check failed',
            details: error instanceof Error ? error.message : String(error),
        });
    }
}
