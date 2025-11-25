import { cookies } from 'next/headers';
import { generateChatId } from '../utils/id-generator';

/**
 * Get or create a chat session ID from cookies
 * This provides session-based chat persistence without requiring authentication
 */
export async function getOrCreateChatSession(): Promise<string> {
    const cookieStore = await cookies();
    let chatId = cookieStore.get('chat_session_id')?.value;

    if (!chatId) {
        chatId = generateChatId();
        cookieStore.set('chat_session_id', chatId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    }

    return chatId;
}

/**
 * Clear the current chat session
 */
export async function clearChatSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('chat_session_id');
}
