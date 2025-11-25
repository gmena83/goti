import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { processDocument } from '../../../../lib/document-processing';
import { generateEmbeddings } from '../../../../lib/embeddings';
import { generateChunkId } from '../../../../lib/utils/id-generator';
import { validateDocumentUpdate } from '../../../../lib/middleware/validation';

export const maxDuration = 60;

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request
        const validation = validateDocumentUpdate(body);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        const { id, title, content, source } = body;

        // Verify document exists
        const { data: existing, error: fetchError } = await supabase
            .from('documents')
            .select('id, title, content, source')
            .eq('id', id)
            .single();

        if (fetchError || !existing) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        // Use existing values if not provided
        const finalTitle = title || existing.title;
        const finalContent = content || existing.content;
        const finalSource = source || existing.source;

        // Process new content
        const processed = await processDocument(finalTitle, finalContent, finalSource);

        // Update document
        const { error: updateError } = await supabase
            .from('documents')
            .update({
                title: processed.title,
                source: processed.source,
                content: processed.content,
                metadata: processed.metadata,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (updateError) {
            return NextResponse.json(
                { error: 'Failed to update document', details: updateError.message },
                { status: 500 }
            );
        }

        // Delete old chunks
        await supabase.from('document_chunks').delete().eq('document_id', id);

        // Generate new embeddings
        const embeddings = await generateEmbeddings(processed.chunks);

        // Insert new chunks
        const chunkRecords = processed.chunks.map((chunk, index) => ({
            id: generateChunkId(id, index),
            document_id: id,
            content: chunk,
            embedding: embeddings[index],
            metadata: {
                chunkIndex: index,
                totalChunks: processed.chunks.length,
                source: processed.source,
            },
        }));

        const { error: chunksError } = await supabase
            .from('document_chunks')
            .insert(chunkRecords);

        if (chunksError) {
            return NextResponse.json(
                { error: 'Failed to update chunks', details: chunksError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            documentId: id,
            chunksCount: processed.chunks.length,
            message: 'Document updated successfully',
        });
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
