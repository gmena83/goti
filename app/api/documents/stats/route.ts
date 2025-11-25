import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    try {
        // Get total counts
        const { count: totalDocs } = await supabase
            .from('documents')
            .select('*', { count: 'exact', head: true });

        const { count: totalChunks } = await supabase
            .from('document_chunks')
            .select('*', { count: 'exact', head: true });

        // Get documents by source
        const { data: docsBySource } = await supabase
            .from('documents')
            .select('source');

        const sourceCount: Record<string, number> = {};
        docsBySource?.forEach(doc => {
            sourceCount[doc.source] = (sourceCount[doc.source] || 0) + 1;
        });

        // Get recent uploads (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { count: recentUploads } = await supabase
            .from('documents')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', sevenDaysAgo.toISOString());

        return NextResponse.json({
            totalDocuments: totalDocs || 0,
            totalChunks: totalChunks || 0,
            documentsBySource: sourceCount,
            recentUploads: recentUploads || 0
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
