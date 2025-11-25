# SQL - Database Query Language

## Why It Matters
SQL is essential for data storage, retrieval, and management in AI applications. Understanding SQL helps with RAG systems, vector databases, and data pipelines.

## Modern SQL Features

### PostgreSQL (Recommended for AI)
- **pgvector Extension**: Vector similarity search
- **JSONB**: Flexible document storage
- **Full-Text Search**: Built-in text search
- **Window Functions**: Advanced analytics

### Vector Search (pgvector)
```sql
-- Create table with vector column
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(1536)
);

-- Create index for similarity search
CREATE INDEX ON documents 
USING ivfflat (embedding vector_cosine_ops);

-- Similarity search
SELECT id, content, 
       1 - (embedding <=> query_embedding) as similarity
FROM documents
WHERE 1 - (embedding <=> query_embedding) > 0.7
ORDER BY embedding <=> query_embedding
LIMIT 5;
```

## Common Patterns for AI Applications

### Storing Embeddings
```sql
-- Insert document with embedding
INSERT INTO documents (content, embedding, metadata)
VALUES (
    'Document text',
    '[0.1, 0.2, ...]'::vector,
    '{"source": "web", "date": "2024-01-01"}'::jsonb
);
```

### RAG Data Retrieval
```sql
-- Get relevant context for RAG
WITH relevant_docs AS (
    SELECT 
        content,
        metadata,
        1 - (embedding <=> $1::vector) as similarity
    FROM document_chunks
    WHERE 1 - (embedding <=> $1::vector) > 0.7
    ORDER BY embedding <=> $1::vector
    LIMIT 5
)
SELECT 
    content,
    metadata->>'source' as source,
    similarity
FROM relevant_docs;
```

### Chat History
```sql
-- Store conversation history
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Get recent messages
SELECT role, content
FROM messages
WHERE chat_id = $1
ORDER BY created_at DESC
LIMIT 10;
```

## Advanced Features

### JSONB Operations
```sql
-- Query JSON data
SELECT 
    metadata->>'title' as title,
    metadata->'tags' as tags
FROM documents
WHERE metadata @> '{"category": "AI"}';
```

### Full-Text Search
```sql
-- Create text search index
CREATE INDEX documents_content_idx 
ON documents 
USING gin(to_tsvector('english', content));

-- Search documents
SELECT content
FROM documents
WHERE to_tsvector('english', content) @@ 
      to_tsquery('english', 'machine & learning');
```

### Aggregations
```sql
-- Analytics queries
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as message_count,
    COUNT(DISTINCT chat_id) as unique_chats
FROM messages
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;
```

## Best Practices

### Indexing
- Create indexes on frequently queried columns
- Use vector indexes for similarity search
- Monitor index usage and performance

### Transactions
```sql
BEGIN;
    INSERT INTO chats (id, title) VALUES ($1, $2);
    INSERT INTO messages (chat_id, role, content) 
    VALUES ($1, 'user', $3);
COMMIT;
```

### Performance
- Use EXPLAIN ANALYZE to optimize queries
- Limit result sets appropriately
- Use prepared statements to prevent SQL injection

## Database Options

### PostgreSQL (Supabase)
- Best for RAG with pgvector
- ACID compliance
- Rich extension ecosystem

### SQLite
- Lightweight, serverless
- Good for local development
- Limited concurrency

### MySQL/MariaDB
- Wide adoption
- Good performance
- Limited vector support

## Resources
- PostgreSQL Docs: https://www.postgresql.org/docs/
- pgvector: https://github.com/pgvector/pgvector
- Supabase SQL: https://supabase.com/docs/guides/database
