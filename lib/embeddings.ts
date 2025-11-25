import { OpenAIEmbeddings } from '@langchain/openai';

// Initialize OpenAI embeddings with text-embedding-3-small model
export const embeddings = new OpenAIEmbeddings({
    modelName: 'text-embedding-3-small',
    openAIApiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate embeddings for a single text string
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    const embedding = await embeddings.embedQuery(text);
    return embedding;
}

/**
 * Generate embeddings for multiple text strings
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    const embeddingResults = await embeddings.embedDocuments(texts);
    return embeddingResults;
}
