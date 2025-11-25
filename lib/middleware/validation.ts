/**
 * Validation utilities for API requests
 */

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

/**
 * Validate chat request payload
 */
export function validateChatRequest(body: any): ValidationResult {
    if (!body.messages || !Array.isArray(body.messages)) {
        return { valid: false, error: 'Messages must be an array' };
    }

    if (body.messages.length === 0) {
        return { valid: false, error: 'Messages array cannot be empty' };
    }

    if (body.messages.length > 50) {
        return { valid: false, error: 'Too many messages (max 50)' };
    }

    for (const msg of body.messages) {
        if (!msg.role || !msg.content) {
            return { valid: false, error: 'Each message must have role and content' };
        }

        if (typeof msg.content !== 'string') {
            return { valid: false, error: 'Message content must be a string' };
        }

        if (msg.content.length > 10000) {
            return { valid: false, error: 'Message content too long (max 10000 chars)' };
        }

        if (!['user', 'assistant', 'system'].includes(msg.role)) {
            return { valid: false, error: 'Invalid message role' };
        }
    }

    return { valid: true };
}

/**
 * Validate document upload payload
 */
export function validateDocumentUpload(body: any): ValidationResult {
    if (!body.title || !body.content || !body.source) {
        return { valid: false, error: 'Missing required fields: title, content, source' };
    }

    if (typeof body.title !== 'string' || typeof body.content !== 'string' || typeof body.source !== 'string') {
        return { valid: false, error: 'Title, content, and source must be strings' };
    }

    if (body.title.length > 500) {
        return { valid: false, error: 'Title too long (max 500 chars)' };
    }

    if (body.content.length > 1000000) {
        return { valid: false, error: 'Document too large (max 1MB)' };
    }

    if (body.source.length > 200) {
        return { valid: false, error: 'Source name too long (max 200 chars)' };
    }

    return { valid: true };
}

/**
 * Validate document update payload
 */
export function validateDocumentUpdate(body: any): ValidationResult {
    if (!body.id) {
        return { valid: false, error: 'Document ID is required' };
    }

    if (typeof body.id !== 'string') {
        return { valid: false, error: 'Document ID must be a string' };
    }

    // Validate other fields if provided
    if (body.title !== undefined) {
        if (typeof body.title !== 'string' || body.title.length > 500) {
            return { valid: false, error: 'Invalid title' };
        }
    }

    if (body.content !== undefined) {
        if (typeof body.content !== 'string' || body.content.length > 1000000) {
            return { valid: false, error: 'Invalid content' };
        }
    }

    if (body.source !== undefined) {
        if (typeof body.source !== 'string' || body.source.length > 200) {
            return { valid: false, error: 'Invalid source' };
        }
    }

    return { valid: true };
}

/**
 * Sanitize string input to prevent injection attacks
 */
export function sanitizeString(input: string): string {
    // Remove any null bytes
    return input.replace(/\0/g, '');
}
