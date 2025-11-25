-- Performance Indexes for GOTI Database
-- Run this migration after the initial schema setup

-- Add index on documents.source for filtering
CREATE INDEX IF NOT EXISTS idx_documents_source ON documents(source);

-- Add index on documents.created_at for sorting
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);

-- Add index on documents.updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_documents_updated_at ON documents(updated_at DESC);

-- Add index on messages.chat_id for faster chat retrieval
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);

-- Add index on messages.created_at for sorting
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Add index on chats.created_at for sorting
CREATE INDEX IF NOT EXISTS idx_chats_created_at ON chats(created_at DESC);

-- Add composite index for document chunks by document_id and metadata
CREATE INDEX IF NOT EXISTS idx_document_chunks_document_id ON document_chunks(document_id);

-- Note: The vector index for embeddings is already created in the main schema.sql:
-- CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
