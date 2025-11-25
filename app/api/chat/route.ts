import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { supabase } from '../../../lib/supabase';
import { searchSimilarChunks, formatContextForPrompt } from '../../../lib/vector-search';
import { generateMessageId } from '../../../lib/utils/id-generator';
import { getOrCreateChatSession } from '../../../lib/auth/session';
import { validateChatRequest } from '../../../lib/middleware/validation';
import { checkRateLimit, getRateLimitHeaders } from '../../../lib/middleware/rate-limit';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request
        const validation = validateChatRequest(body);
        if (!validation.valid) {
            return new Response(JSON.stringify({ error: validation.error }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Get or create chat session
        const chatId = await getOrCreateChatSession();

        // Rate limiting (20 requests per minute per session)
        const rateLimit = checkRateLimit(chatId, 20, 60000);
        const rateLimitHeaders = getRateLimitHeaders(rateLimit, 20);

        if (!rateLimit.allowed) {
            return new Response(JSON.stringify({
                error: 'Rate limit exceeded. Please try again later.'
            }), {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    ...rateLimitHeaders
                },
            });
        }

        const { messages, image } = body;

        // Transform messages from UIMessage format to CoreMessage format
        const transformedMessages = messages.map((msg: any, index: number) => {
            // If it's the last message and we have an image, format as multi-modal
            if (index === messages.length - 1 && image) {
                return {
                    role: msg.role,
                    content: [
                        { type: 'text', text: msg.content || '' },
                        { type: 'image', image: image }
                    ]
                };
            }

            return {
                role: msg.role,
                content: msg.parts?.[0]?.text || msg.content || '',
            };
        });

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY environment variable is not set');
        }

        const openai = createOpenAI({
            apiKey: apiKey,
        });

        // Get the last user message for RAG retrieval
        const lastMessage = messages[messages.length - 1];
        const userQuery = lastMessage.parts?.[0]?.text || lastMessage.content || '';

        // Perform RAG retrieval with improved error handling
        let contextText = '';
        let ragStatus = 'success';
        try {
            const relevantChunks = await searchSimilarChunks(userQuery, 3, 0.7);
            contextText = formatContextForPrompt(relevantChunks);
            if (relevantChunks.length === 0) {
                ragStatus = 'no_results';
            }
        } catch (ragError) {
            console.error('RAG retrieval error:', ragError);
            ragStatus = 'error';
            // Add note to system prompt about unavailable knowledge base
            contextText = '\n\nNote: Knowledge base search is temporarily unavailable.';
        }

        // Save user message to Supabase
        // chatId already obtained from session above

        const { error: chatError } = await supabase
            .from('chats')
            .upsert({ id: chatId, title: 'General Chat' }, { onConflict: 'id' });

        if (chatError) console.error('Error creating chat:', chatError);

        await supabase.from('messages').insert({
            id: generateMessageId(),
            chat_id: chatId,
            role: 'user',
            content: userQuery,
        });

        // Enhanced system prompt with RAG context
        const systemPrompt = `You are GOTI (Generative Orchestrator of Technological Innovation), an AI assistant designed to help the user with their vibecoding project. You are helpful, educational, and technical.

You have access to a knowledge base containing documentation and changelogs for: Lovable, Zapier, Activepieces, Maker, Replit, Bubble, and Base44.

When answering questions, use the provided context from the knowledge base when relevant. Always cite your sources when using information from the knowledge base.${contextText}`;

        const result = streamText({
            model: openai('gpt-4o'),
            messages: transformedMessages,
            system: systemPrompt,
            onFinish: async (event) => {
                // Save assistant message
                await supabase.from('messages').insert({
                    id: generateMessageId(),
                    chat_id: chatId,
                    role: 'assistant',
                    content: event.text,
                });
            }
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Error in chat API route:', error);
        return new Response(JSON.stringify({ error: 'Internal server error', details: error instanceof Error ? error.message : String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
