/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a dedicated rate limiting service
 */

interface RateLimitRecord {
    count: number;
    resetAt: number;
}

const requestCounts = new Map<string, RateLimitRecord>();

// Clean up old entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requestCounts.entries()) {
        if (now > record.resetAt) {
            requestCounts.delete(key);
        }
    }
}, 5 * 60 * 1000);

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt?: number;
}

/**
 * Check if a request should be rate limited
 * 
 * @param identifier - Unique identifier (e.g., IP address, session ID, user ID)
 * @param maxRequests - Maximum number of requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit result with allowed status and remaining requests
 */
export function checkRateLimit(
    identifier: string,
    maxRequests: number = 10,
    windowMs: number = 60000
): RateLimitResult {
    const now = Date.now();
    const record = requestCounts.get(identifier);

    // No record or window expired - create new record
    if (!record || now > record.resetAt) {
        const resetAt = now + windowMs;
        requestCounts.set(identifier, { count: 1, resetAt });
        return { allowed: true, remaining: maxRequests - 1, resetAt };
    }

    // Limit exceeded
    if (record.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: record.resetAt };
    }

    // Increment count
    record.count++;
    return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt };
}

/**
 * Get rate limit headers for HTTP response
 */
export function getRateLimitHeaders(result: RateLimitResult, maxRequests: number): Record<string, string> {
    const headers: Record<string, string> = {
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
    };

    if (result.resetAt) {
        headers['X-RateLimit-Reset'] = Math.floor(result.resetAt / 1000).toString();
    }

    if (!result.allowed && result.resetAt) {
        const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
        headers['Retry-After'] = retryAfter.toString();
    }

    return headers;
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or manual intervention
 */
export function resetRateLimit(identifier: string): void {
    requestCounts.delete(identifier);
}
