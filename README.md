# GOTI - Generative Orchestrator of Technological Innovation

An AI assistant powered by OpenAI GPT-4 with RAG (Retrieval-Augmented Generation) capabilities, designed to help with vibecoding projects by providing context-aware responses from a knowledge base of tool documentation and changelogs.

## Features

### Core Functionality
- 🤖 **AI Chat Interface**: Real-time streaming chat powered by OpenAI GPT-4
- 📚 **RAG System**: Semantic search over documentation using vector embeddings
- 💾 **Persistent Storage**: Chat history and documents stored in Supabase
- 🔍 **Vector Search**: pgvector-powered similarity search for relevant context retrieval

### Knowledge Base Coverage
GOTI maintains up-to-date knowledge of:
- **Lovable** - AI-powered full-stack development platform
- **Zapier** - Workflow automation
- **Activepieces** - Open-source automation
- **Maker** - No-code platform
- **Replit** - Cloud development environment
- **Bubble** - Visual programming platform
- **Base44** - AI app builder

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React, TypeScript
- **AI**: OpenAI GPT-4, text-embedding-3-small
- **Database**: Supabase (PostgreSQL + pgvector)
- **RAG**: LangChain for document processing and embeddings
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- OpenAI API key

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. Run the entire contents of `supabase/schema.sql`

This will:
- Enable the pgvector extension
- Create `chats`, `messages`, `documents`, and `document_chunks` tables
- Set up the `match_document_chunks` function for vector similarity search
- Configure Row Level Security policies

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Chat Interface

Simply type your questions in the chat interface. GOTI will:
1. Search the knowledge base for relevant context
2. Use retrieved information to provide accurate answers
3. Cite sources when using knowledge base content

### Uploading Documents

**Via Browser Console:**
```javascript
fetch('/api/documents/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: "Document Title",
        source: "Source Name (e.g., Lovable)",
        content: "Your markdown content here..."
    })
}).then(r => r.json()).then(console.log);
```

**Via API:**
```bash
curl -X POST http://localhost:3000/api/documents/upload \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Document Title",
    "content": "Your content...",
    "source": "Source Name"
  }'
```

### Managing Documents

- **List documents**: `GET /api/documents/list`
- **Delete document**: `DELETE /api/documents/delete?id=documentId`
- **Health check**: `GET /api/health`

## Project Structure

```
goti/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Chat API with RAG integration
│   │   ├── documents/
│   │   │   ├── upload/route.ts    # Document upload & processing
│   │   │   ├── list/route.ts      # List all documents
│   │   │   └── delete/route.ts    # Delete documents
│   │   └── health/route.ts        # System health check
│   ├── components/
│   │   └── chat.tsx               # Chat UI component
│   └── page.tsx                   # Main page
├── lib/
│   ├── supabase.ts                # Supabase client
│   ├── embeddings.ts              # OpenAI embeddings utilities
│   ├── document-processing.ts     # Text chunking & processing
│   └── vector-search.ts           # Semantic search functions
├── supabase/
│   └── schema.sql                 # Database schema with pgvector
└── docs/
    ├── changelog-sources.md       # Documentation sources reference
    └── sample-documents/          # Sample documents for testing
```

## How RAG Works

1. **Document Upload**: Documents are split into chunks using RecursiveCharacterTextSplitter
2. **Embedding Generation**: Each chunk is converted to a 1536-dimensional vector using OpenAI's text-embedding-3-small
3. **Storage**: Chunks and embeddings are stored in Supabase with pgvector
4. **Query Processing**: User questions are converted to embeddings
5. **Similarity Search**: pgvector finds the most relevant chunks using cosine similarity
6. **Context Injection**: Retrieved chunks are added to the system prompt
7. **Response Generation**: GPT-4 generates answers using the provided context

## Development

### Key Files to Know

- `app/api/chat/route.ts` - Main chat logic with RAG retrieval
- `lib/vector-search.ts` - Semantic search implementation
- `lib/document-processing.ts` - Document chunking strategy
- `supabase/schema.sql` - Complete database schema

### Adding New Tools

1. Add the tool's changelog URL to `docs/changelog-sources.md`
2. Scrape or copy the changelog content
3. Upload via the `/api/documents/upload` endpoint
4. GOTI will automatically use it for relevant queries

## Troubleshooting

### Build Errors with LangChain

If you see module resolution errors:
```bash
npm install @langchain/core @langchain/textsplitters --legacy-peer-deps
```

### Database Connection Issues

Verify your Supabase credentials in `.env.local` and ensure the schema has been run.

### RAG Not Working

1. Check `/api/health` to verify tables are accessible
2. Ensure documents have been uploaded successfully
3. Check browser console for any API errors

## Future Enhancements

- [ ] UI for document management
- [ ] PDF processing with pdf.co integration
- [ ] Automated changelog scraping
- [ ] Multi-modal support (images, diagrams)
- [ ] Document versioning and updates
- [ ] Advanced chunking strategies for code

## License

MIT

## Contributing

This is a personal project for vibecoding assistance. Feel free to fork and adapt for your needs!
