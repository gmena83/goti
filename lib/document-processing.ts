import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

/**
 * Split text into chunks for embedding
 * Uses recursive character splitting to maintain context
 */
export async function chunkText(
    text: string,
    chunkSize: number = 1000,
    chunkOverlap: number = 200
): Promise<string[]> {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize,
        chunkOverlap,
        separators: ['\n\n', '\n', '. ', ' ', ''],
    });

    const chunks = await splitter.splitText(text);
    return chunks;
}

/**
 * Extract metadata from document content
 */
export function extractMetadata(content: string, source: string): Record<string, any> {
    return {
        source,
        length: content.length,
        wordCount: content.split(/\s+/).length,
        processedAt: new Date().toISOString(),
    };
}

/**
 * Process a document: extract text, chunk it, and prepare metadata
 */
export async function processDocument(
    title: string,
    content: string,
    source: string
): Promise<{
    title: string;
    content: string;
    source: string;
    chunks: string[];
    metadata: Record<string, any>;
}> {
    const chunks = await chunkText(content);
    const metadata = extractMetadata(content, source);

    return {
        title,
        content,
        source,
        chunks,
        metadata,
    };
}
