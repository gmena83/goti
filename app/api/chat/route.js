import { NextResponse } from "next/server";
import { TrelloService } from "../../lib/TrelloService";
import { LearningRecommender } from "../../lib/LearningRecommender";
import { generateResponse } from "../../lib/ai/llm-client";
import { constructSystemPrompt } from "../../lib/ai/system-prompt";

export async function POST(request) {
    try {
        const { messages } = await request.json();
        const lastMessage = messages[messages.length - 1];
        const userText = lastMessage.content;

        // 1. Analyze for Actions (Trello, Learning) - Keep this heuristic for now, or move to LLM function calling later
        const actions = [];
        let additionalContext = "";

        // Mock Trello Integration
        if (userText.toLowerCase().includes("trello")) {
            const result = await TrelloService.createCard("New Idea", userText);
            actions.push(`Created Trello Card: New Idea (${result.url})`);
            additionalContext += `\n[System]: A Trello card was created at ${result.url}. Inform the user.`;
        }

        // Mock Learning Recommendations
        const recommendations = LearningRecommender.analyze(userText);
        if (recommendations.length > 0) {
            recommendations.forEach(rec => {
                actions.push(`Recommended: ${rec.title}`);
                additionalContext += `\n[System]: The user might benefit from this resource: ${rec.title} (${rec.url}). Suggest it.`;
            });
        }

        // 2. Generate AI Response
        const systemPrompt = constructSystemPrompt(additionalContext);

        // Filter messages to only send necessary fields to OpenAI
        const apiMessages = messages.map(m => ({
            role: m.role,
            content: m.content
        }));

        const aiResponse = await generateResponse(apiMessages, systemPrompt);

        return NextResponse.json({
            message: aiResponse.content,
            actions: actions
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: "I encountered an error processing your request." },
            { status: 500 }
        );
    }
}
