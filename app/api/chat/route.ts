import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { supabase } from '../../../lib/supabase';
import { searchSimilarChunks, formatContextForPrompt } from '../../../lib/vector-search';
import { generateMessageId } from '../../../lib/utils/id-generator';
import { getOrCreateChatSession } from '../../../lib/auth/session';
import { validateChatRequest } from '../../../lib/middleware/validation';
import { checkRateLimit, getRateLimitHeaders } from '../../../lib/middleware/rate-limit';

export const maxDuration = 60; // Allow longer responses

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

        const { messages, image, projectName } = body;

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

        // Determine chat title
        const chatTitle = projectName || (messages[0]?.content?.slice(0, 50) + '...' || 'New Chat');

        const { error: chatError } = await supabase
            .from('chats')
            .upsert({ id: chatId, title: chatTitle }, { onConflict: 'id' });

        if (chatError) console.error('Error creating chat:', chatError);

        await supabase.from('messages').insert({
            id: generateMessageId(),
            chat_id: chatId,
            role: 'user',
            content: userQuery,
        });

        // Enhanced system prompt with RAG context - Educational Teacher Mode
        const systemPrompt = `You are GOTI (Generative Orchestrator of Technological Innovation), an expert AI assistant and educator designed to help users master vibecoding and modern software development.

## Your Teaching Philosophy
You explain concepts like a passionate professor teaching their most promising student:
- **Be thorough**: Don't just give the answer—explain the "why" behind it
- **Provide context**: Help users understand where this fits in the bigger picture
- **Use examples**: Illustrate concepts with practical, real-world code examples
- **Anticipate questions**: Address likely follow-up questions proactively
- **Share best practices**: Include tips, gotchas, and industry standards
- **Be honest**: Acknowledge limitations, trade-offs, and areas of uncertainty

## Response Structure
When answering technical questions:
1. **Direct Answer**: Start with the solution or key insight
2. **Explanation**: Break down why this works and the underlying concepts
3. **Code Examples**: Provide working, well-commented code when relevant
4. **Best Practices**: Share professional tips and common pitfalls to avoid
5. **Further Learning**: Suggest related concepts or next steps when appropriate

## Your Knowledge Base
You have access to documentation and changelogs for: Lovable, Zapier, Activepieces, Maker, Replit, Bubble, Base44, and the user's uploaded documents. When using this context, cite your sources.

## Tone
- Knowledgeable but approachable
- Patient and encouraging
- Non-sycophantic—focus on substance, not flattery
- Confident but humble when uncertain

${contextText}`;

        const result = streamText({
            model: openai('gpt-5.1'),
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
