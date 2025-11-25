import { supabase } from '../../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = (page - 1) * limit;

        // Search
        const search = searchParams.get('search') || '';

        // Filter by source
        const source = searchParams.get('source') || '';

        // Sorting
        const sortBy = searchParams.get('sort') || 'created_at';
        const order = searchParams.get('order') || 'desc';

        // Build query - get documents with chunk count
        // Note: Supabase doesn't support COUNT aggregation in select directly,
        // so we'll fetch documents and get chunk counts separately for accuracy
        let query = supabase
            .from('documents')
            .select('*', { count: 'exact' });

        // Apply search filter
        if (search) {
            query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
        }

        // Apply source filter
        if (source) {
            query = query.eq('source', source);
        }

        // Apply sorting
        query = query.order(sortBy, { ascending: order === 'asc' });

        // Apply pagination
        query = query.range(offset, offset + limit - 1);

        const { data: documents, error, count } = await query;

        if (error) {
            console.error('Error fetching documents:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Get chunk counts for each document
        const documentsWithChunks = await Promise.all(
            (documents || []).map(async (doc) => {
                const { count: chunkCount } = await supabase
                    .from('document_chunks')
                    .select('*', { count: 'exact', head: true })
                    .eq('document_id', doc.id);

                return {
                    ...doc,
                    chunk_count: chunkCount || 0
                };
            })
        );

        // Get unique sources for filter dropdown
        const { data: sources } = await supabase
            .from('documents')
            .select('source')
            .order('source');

        const uniqueSources = [...new Set(sources?.map(s => s.source) || [])];

        return NextResponse.json({
            documents: documentsWithChunks,
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit)
            },
            sources: uniqueSources
        });
    } catch (error) {
        console.error('Error in documents list:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
