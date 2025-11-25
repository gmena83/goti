import { randomUUID } from 'crypto';

/**
 * Generate a unique ID with optional prefix
 */
export function generateId(prefix?: string): string {
    const uuid = randomUUID();
    return prefix ? `${prefix}_${uuid}` : uuid;
}

/**
 * Generate a document ID
 */
export function generateDocumentId(): string {
    return generateId('doc');
}

/**
 * Generate a chunk ID for a specific document and index
 */
export function generateChunkId(documentId: string, index: number): string {
    return `chunk_${documentId}_${index}`;
}

/**
 * Generate a message ID
 */
export function generateMessageId(): string {
    return generateId('msg');
}

/**
 * Generate a chat ID
 */
export function generateChatId(): string {
    return generateId('chat');
}
