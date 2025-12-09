
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { processDocument } from '../../../../lib/document-processing';
import { generateEmbeddings } from '../../../../lib/embeddings';
import { generateDocumentId, generateChunkId } from '../../../../lib/utils/id-generator';
// @ts-ignore
const pdf = require('pdf-parse');

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const source = formData.get('source') as string || 'Upload';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        let content = '';
        const fileType = file.type;
        const fileName = file.name;

        // Extract text based on file type
        if (fileType === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const data = await pdf(buffer);
            content = data.text;
        } else if (
            fileType === 'application/json' ||
            fileName.endsWith('.json')
        ) {
            const text = await file.text();
            content = text;
            // Optional: You could parse it to validate or format it, 
            // but storing raw JSON text is often fine for RAG if it's readable.
        } else if (
            fileType.startsWith('text/') ||
            fileName.endsWith('.md') ||
            fileName.endsWith('.txt')
        ) {
            content = await file.text();
        } else {
            return NextResponse.json(
                { error: 'Unsupported file type. Please upload PDF, JSON, or Text files.' },
                { status: 400 }
            );
        }

        if (!content.trim()) {
            return NextResponse.json(
                { error: 'File appears to be empty or text could not be extracted.' },
                { status: 400 }
            );
        }

        // Process the document
        const processed = await processDocument(fileName, content, source);
        const documentId = generateDocumentId();

        // Save metadata
        const { error: docError } = await supabase.from('documents').insert({
            id: documentId,
            title: processed.title,
            source: processed.source,
            content: processed.content,
            metadata: {
                ...processed.metadata,
                fileType,
                originalName: fileName
            },
        });

        if (docError) throw new Error(`Failed to save document: ${docError.message}`);

        // Generate embeddings
        const embeddings = await generateEmbeddings(processed.chunks);

        // Save chunks
        const chunkRecords = processed.chunks.map((chunk, index) => ({
            id: generateChunkId(documentId, index),
            document_id: documentId,
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
            // Rollback
            await supabase.from('documents').delete().eq('id', documentId);
            throw new Error(`Failed to save chunks: ${chunksError.message}`);
        }

        return NextResponse.json({
            success: true,
            documentId,
            chunksCount: processed.chunks.length,
            message: `Successfully indexed ${fileName}`,
        });

    } catch (error) {
        console.error('Error in file upload:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
