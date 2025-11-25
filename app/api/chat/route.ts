import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { supabase } from '../../../lib/supabase';
import { searchSimilarChunks, formatContextForPrompt } from '../../../lib/vector-search';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Transform messages from UIMessage format to CoreMessage format
        const transformedMessages = messages.map((msg: any) => ({
            role: msg.role,
            content: msg.parts?.[0]?.text || msg.content || '',
        }));

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

        // Perform RAG retrieval
        let contextText = '';
        try {
            const relevantChunks = await searchSimilarChunks(userQuery, 3, 0.7);
            contextText = formatContextForPrompt(relevantChunks);
        } catch (ragError) {
            console.error('RAG retrieval error (continuing without context):', ragError);
            // Continue without context if RAG fails
        }

        // Save user message to Supabase
        const chatId = 'default-chat';

        const { error: chatError } = await supabase
            .from('chats')
            .upsert({ id: chatId, title: 'General Chat' }, { onConflict: 'id' });

        if (chatError) console.error('Error creating chat:', chatError);

        await supabase.from('messages').insert({
            id: Date.now().toString(),
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
                    id: (Date.now() + 1).toString(),
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
