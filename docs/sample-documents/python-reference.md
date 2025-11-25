# Python - Core Language Reference

## Why It Matters
Python is the primary language for AI/ML development, data processing, and automation. It's essential for building AI workflows, training models, and deploying applications.

## Recent Updates (Python 3.12+)

### Performance Improvements
- **Faster CPython**: 5-10% performance boost in 3.12
- **Better Memory Management**: Reduced memory overhead
- **Improved Error Messages**: More helpful traceback information

### New Features
- **Type Parameter Syntax**: Simplified generic types
- **f-string Improvements**: Better string formatting
- **Per-Interpreter GIL**: Better multi-threading support

## Key Libraries for AI/ML

### Core ML Libraries
- **NumPy**: Numerical computing and arrays
- **Pandas**: Data manipulation and analysis
- **Scikit-learn**: Traditional machine learning

### Deep Learning Frameworks
- **PyTorch**: Dynamic neural networks, research-friendly
- **TensorFlow**: Production ML, scalable deployment
- **JAX**: High-performance numerical computing

### LLM & AI Libraries
- **LangChain**: Building LLM applications
- **LlamaIndex**: Data framework for LLMs
- **Transformers (Hugging Face)**: Pre-trained models
- **OpenAI SDK**: GPT and other OpenAI models
- **Anthropic SDK**: Claude AI integration

### Vector Databases
- **Pinecone**: Managed vector database
- **Weaviate**: Open-source vector search
- **Chroma**: Embeddings database
- **FAISS**: Facebook AI similarity search

## Common Patterns for AI Workflows

### Prompt Engineering
```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain RAG architecture"}
    ]
)
```

### RAG Implementation
```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA

# Create vector store
vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings()
)

# Create RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever()
)
```

### Async Operations
```python
import asyncio

async def process_multiple_prompts(prompts):
    tasks = [generate_response(p) for p in prompts]
    return await asyncio.gather(*tasks)
```

## Best Practices

### Type Hints
```python
from typing import List, Dict, Optional

def process_data(
    items: List[str],
    config: Dict[str, any],
    max_items: Optional[int] = None
) -> List[Dict]:
    # Implementation
    pass
```

### Error Handling
```python
try:
    response = api_call()
except APIError as e:
    logger.error(f"API failed: {e}")
    # Fallback logic
```

### Environment Management
```python
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
```

## Key Concepts

### Data Processing
- List comprehensions for efficient iteration
- Generators for memory-efficient processing
- Context managers for resource management

### Async/Await
- Concurrent API calls
- Non-blocking I/O operations
- Event loop management

### Decorators
- Function wrapping and modification
- Caching and memoization
- Logging and monitoring

## Resources
- Official Docs: https://docs.python.org/3/
- PyPI (Package Index): https://pypi.org/
- Python Enhancement Proposals (PEPs): https://peps.python.org/
