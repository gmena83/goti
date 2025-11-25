# GOTI Assistant Walkthrough

## Overview
GOTI (Generative Orchestrator of Technological Innovation) is an AI assistant designed to help with vibecoding projects. This walkthrough demonstrates the current functionality of the chat interface.

## Features

### 1. Chat Interface
The chat interface allows users to interact with the AI assistant. It supports:
-   **Real-time Streaming**: Responses are streamed character by character.
-   **Thinking State**: A visual indicator shows when the AI is processing a request.
-   **Markdown Support**: Responses are rendered with Markdown support (code blocks, bold text, etc.).

### 2. Backend Integration
The application uses the Vercel AI SDK to connect to OpenAI's GPT-4o model.
-   **API Route**: `app/api/chat/route.ts` handles the chat requests and streams the response back to the client.
-   **Environment Variables**: Securely manages the OpenAI API key.

### Supabase Integration
- **Client**: `lib/supabase.ts` initializes the Supabase client.
- **Schema**: `supabase/schema.sql` defines the `chats` and `messages` tables.
- **Persistence**: The API route (`app/api/chat/route.ts`) saves messages to Supabase automatically.

## Setup & Verification

1.  **Environment Setup**:
    Ensure `.env.local` is present with:
    - `OPENAI_API_KEY`
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2.  **Database Setup**:
    - Go to your Supabase Dashboard -> SQL Editor.
    - Run the contents of `supabase/schema.sql`.

3.  **Running the App**:
    ```bash
    npm run dev
    ```

3.  **Testing**:
    -   Open the app in the browser.
    -   Type a message (e.g., "Hello, who are you?").
    -   Verify that the response streams in and the "Thinking..." state appears while waiting.

## Code Highlights

### Chat Component (`app/components/chat.tsx`)
Manual `fetch` implementation for robust streaming:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
    // ...
    const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: [...messages, userMessage] }),
    });
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    // ... manual stream reading loop
};
```

### API Route (`app/api/chat/route.ts`)
Using `toTextStreamResponse` for compatibility:
```typescript
const result = streamText({
    model: openai('gpt-4o'),
    messages: transformedMessages,
    system: "You are GOTI...",
});

return result.toTextStreamResponse();
```
