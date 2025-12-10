# GOTI Repository Context

This file provides context to AI coding agents like Jules to help them understand and work with this codebase effectively.

## Project Overview

**GOTI** (Generative Orchestrator of Technological Innovation) is an AI assistant with RAG capabilities that helps with vibecoding projects. It provides context-aware responses from a knowledge base of tool documentation and changelogs.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **AI/LLM** | OpenAI GPT-5.1, Vercel AI SDK, LangChain |
| **Database** | Supabase (PostgreSQL + pgvector) |
| **Styling** | Tailwind CSS, Shadcn/UI, Lucide Icons |
| **Deployment** | Vercel |

## Project Structure

```
goti/
├── app/
│   ├── api/           # Next.js API routes
│   │   ├── chat/      # Main chat endpoint with RAG
│   │   ├── documents/ # Document management
│   │   ├── jules/     # Jules AI integration
│   │   └── health/    # System health check
│   ├── components/    # React components
│   └── page.tsx       # Main entry point
├── lib/
│   ├── jules/         # Jules AI client module
│   ├── supabase.ts    # Database client
│   ├── embeddings.ts  # OpenAI embeddings
│   └── vector-search.ts # Semantic search
├── supabase/
│   └── schema.sql     # Database schema
└── docs/              # Documentation files
```

## Code Standards

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for functions

### Components

- Follow existing patterns in `app/components/`
- Use Shadcn/UI components when available
- Keep components focused and reusable

### API Routes

- Place in `app/api/` following Next.js 16 conventions
- Use proper TypeScript types for request/response
- Handle errors consistently with try/catch

### Styling

- Use Tailwind CSS utility classes
- Follow existing color scheme (dark mode default)
- Use CSS variables from `globals.css`

## Key Dependencies

- `@ai-sdk/openai` - OpenAI provider for Vercel AI SDK
- `@supabase/supabase-js` - Database client
- `langchain` - Document processing and RAG
- `react-markdown` - Markdown rendering
- `zod` - Schema validation

## Testing

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Important Notes

- The app uses server-side API routes for all AI/database operations
- Chat history is persisted in Supabase
- RAG uses pgvector for semantic search with 1536-dim embeddings
- Environment variables are in `.env.local` (not committed)
