import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { processDocument } from '../../../../lib/document-processing';
import { generateEmbeddings } from '../../../../lib/embeddings';

export const maxDuration = 60; // Allow up to 60 seconds for processing

export async function POST(req: NextRequest) {
    try {
        const { title, content, source } = await req.json();

        if (!title || !content || !source) {
            return NextResponse.json(
                { error: 'Missing required fields: title, content, source' },
                { status: 400 }
            );
        }

        // Process the document: chunk it and extract metadata
        const processed = await processDocument(title, content, source);

        // Generate a unique ID for the document
        const documentId = `doc_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Save the document to Supabase
        const { error: docError } = await supabase.from('documents').insert({
            id: documentId,
            title: processed.title,
            source: processed.source,
            content: processed.content,
            metadata: processed.metadata,
        });

        if (docError) {
            console.error('Error saving document:', docError);
            return NextResponse.json(
                { error: 'Failed to save document', details: docError.message },
                { status: 500 }
            );
        }

        // Generate embeddings for all chunks
        const embeddings = await generateEmbeddings(processed.chunks);

        // Prepare chunk records with embeddings
        const chunkRecords = processed.chunks.map((chunk, index) => ({
            id: `chunk_${documentId}_${index}`,
            document_id: documentId,
            content: chunk,
            embedding: embeddings[index],
            metadata: {
                chunkIndex: index,
                totalChunks: processed.chunks.length,
                source: processed.source,
            },
        }));

        // Save all chunks to Supabase
        const { error: chunksError } = await supabase
            .from('document_chunks')
            .insert(chunkRecords);

        if (chunksError) {
            console.error('Error saving chunks:', chunksError);
            // Clean up the document if chunks failed
            await supabase.from('documents').delete().eq('id', documentId);
            return NextResponse.json(
                { error: 'Failed to save document chunks', details: chunksError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            documentId,
            chunksCount: processed.chunks.length,
            message: 'Document uploaded and processed successfully',
        });
    } catch (error) {
        console.error('Error in document upload:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
