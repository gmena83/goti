import { supabase } from './supabase';
import { generateEmbedding } from './embeddings';

/**
 * Perform vector similarity search in Supabase
 * Returns the most relevant document chunks based on the query
 */
export async function searchSimilarChunks(
    query: string,
    limit: number = 5,
    similarityThreshold: number = 0.7
): Promise<Array<{
    id: string;
    content: string;
    similarity: number;
    metadata: any;
    document_id: string;
}>> {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Perform similarity search using pgvector
    // Using cosine distance (1 - cosine_similarity)
    const { data, error } = await supabase.rpc('match_document_chunks', {
        query_embedding: queryEmbedding,
        match_threshold: 1 - similarityThreshold, // Convert similarity to distance
        match_count: limit,
    });

    if (error) {
        console.error('Error searching similar chunks:', error);
        throw error;
    }

    return data || [];
}

/**
 * Format retrieved chunks into context for the AI prompt
 */
export function formatContextForPrompt(
    chunks: Array<{
        content: string;
        metadata: any;
    }>
): string {
    if (chunks.length === 0) {
        return '';
    }

    const contextParts = chunks.map((chunk, index) => {
        const source = chunk.metadata?.source || 'Unknown source';
        return `[${index + 1}] From ${source}:\n${chunk.content}`;
    });

    return `\n\nRelevant context from knowledge base:\n${contextParts.join('\n\n---\n\n')}`;
}
