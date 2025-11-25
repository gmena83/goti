-- Create a table for chats
create table chats (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text
);

-- Create a table for messages
create table messages (
  id text primary key,
  chat_id text references chats(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table chats enable row level security;
alter table messages enable row level security;

-- Create policies (for now, allow public access for demo purposes, but in production use auth)
create policy "Allow public access to chats"
on chats for all
using (true)
with check (true);

create policy "Allow public access to messages"
on messages for all
using (true)
with check (true);

-- Enable pgvector extension for vector similarity search
create extension if not exists vector;

-- Create a table for documents
create table documents (
  id text primary key,
  title text not null,
  source text not null, -- e.g., "Lovable Changelog", "Zapier Docs"
  content text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for document chunks with embeddings
create table document_chunks (
  id text primary key,
  document_id text references documents(id) on delete cascade,
  content text not null,
  embedding vector(1536), -- OpenAI text-embedding-3-small uses 1536 dimensions
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create an index for faster vector similarity search
create index on document_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Enable Row Level Security
alter table documents enable row level security;
alter table document_chunks enable row level security;

-- Create policies (public access for demo)
create policy "Allow public access to documents"
on documents for all
using (true)
with check (true);

create policy "Allow public access to document_chunks"
on document_chunks for all
using (true)
with check (true);

-- Create a function for vector similarity search
create or replace function match_document_chunks(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id text,
  document_id text,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    document_chunks.id,
    document_chunks.document_id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
$$;
