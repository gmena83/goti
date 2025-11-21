import OpenAI from "openai";

// Initialize OpenAI Client
// This expects OPENAI_API_KEY to be present in environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "mock-key", // Fallback for build/test without keys
    dangerouslyAllowBrowser: false,
});

export const generateResponse = async (messages, systemPrompt, model = "gpt-4o") => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.warn("OPENAI_API_KEY is missing. Returning mock response.");
            return {
                content: "I am ready to help, but I need my brain connected! Please add an OPENAI_API_KEY to your environment variables.",
                role: "assistant"
            };
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ],
            model: model,
        });

        return completion.choices[0].message;
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw error;
    }
};
