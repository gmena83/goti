# Implementation Plan - Supabase Integration

## Goal Description
Integrate Supabase to persist chat history. This involves setting up the Supabase client, defining the database schema, and updating the chat API to save messages.

## User Review Required
> [!IMPORTANT]
> You will need to provide your Supabase URL and Anon Key in `.env.local`.
> You will also need to run the provided SQL schema in your Supabase SQL Editor.

## Proposed Changes

### Configuration
#### [NEW] [.env.local]
- Add `https://ornzkcoaqbfrkcvdxweg.supabase.coL` and `sb_publishable_LcGb5QH4bdvBIgmmEuTJWA_qF6j08Ru`.

### Lib
#### [NEW] [lib/supabase.ts](file:///c:/Menatech/Antigravity/goti/lib/supabase.ts)
- Initialize and export the Supabase client.

### Database
#### [NEW] [supabase/schema.sql](file:///c:/Menatech/Antigravity/goti/supabase/schema.sql)
- SQL commands to create `chats` and `messages` tables.

### API Route
#### [MODIFY] [app/api/chat/route.ts](file:///c:/Menatech/Antigravity/goti/app/api/chat/route.ts)
- Save the user message to Supabase before generating response.
- Save the assistant response to Supabase using `onFinish` callback.

## Verification Plan

### Manual Verification
- User adds credentials.
- User runs SQL schema.
- Send a message in chat.
- Verify in Supabase dashboard that the message appears in the `messages` table.
