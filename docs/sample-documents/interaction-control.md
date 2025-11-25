# Interaction & Control - Communicating with AI Models

## Why It Matters
These formats and languages define how you communicate with AI models, structure data, and control AI behavior. Mastering them is essential for effective AI development.

## English Prompts - Natural Language Control

### Overview
Prompts are instructions given to AI models in natural language. Well-crafted prompts dramatically improve AI output quality.

### Prompt Engineering Principles

#### 1. Be Specific and Clear
```
❌ Bad: "Write code"
✅ Good: "Write a Python function that takes a list of numbers and returns the average, handling empty lists gracefully"
```

#### 2. Provide Context
```
You are an expert Python developer helping with data processing.
I need to clean a CSV file with the following structure:
- Column 1: User ID (integer)
- Column 2: Email (string, may have invalid formats)
- Column 3: Signup Date (YYYY-MM-DD format)

Task: Write a function to validate and clean this data.
```

#### 3. Use Examples (Few-Shot Learning)
```
Convert these sentences to JSON:

Example 1:
Input: "John is 25 years old"
Output: {"name": "John", "age": 25}

Example 2:
Input: "Sarah lives in Paris"
Output: {"name": "Sarah", "city": "Paris"}

Now convert: "Mike works at Google"
```

#### 4. Specify Format
```
Respond in the following JSON format:
{
    "summary": "brief summary",
    "code": "the code solution",
    "explanation": "step-by-step explanation"
}
```

### Advanced Prompt Patterns

#### Chain of Thought
```
Let's solve this step by step:
1. First, identify the problem
2. Then, break it into sub-problems
3. Solve each sub-problem
4. Combine the solutions
```

#### Role-Based Prompting
```
You are a senior software architect reviewing code.
Analyze this code for:
- Performance issues
- Security vulnerabilities
- Best practice violations
```

#### Constrained Generation
```
Write a product description that:
- Is exactly 50 words
- Includes the keywords: "innovative", "efficient", "affordable"
- Uses a professional tone
- Ends with a call to action
```

## JSON - Data Interchange Format

### Overview
JSON (JavaScript Object Notation) is the standard format for structuring data in AI applications, APIs, and configurations.

### Basic Structure
```json
{
    "user": {
        "id": "123",
        "name": "Alice",
        "email": "alice@example.com",
        "preferences": {
            "theme": "dark",
            "notifications": true
        },
        "tags": ["developer", "ai-enthusiast"]
    }
}
```

### AI Application Patterns

#### Chat Messages
```json
{
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Explain RAG architecture"
        },
        {
            "role": "assistant",
            "content": "RAG combines retrieval with generation..."
        }
    ]
}
```

#### Function Calling
```json
{
    "name": "search_knowledge_base",
    "description": "Search the knowledge base for relevant information",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The search query"
            },
            "max_results": {
                "type": "integer",
                "description": "Maximum number of results",
                "default": 5
            }
        },
        "required": ["query"]
    }
}
```

#### API Responses
```json
{
    "status": "success",
    "data": {
        "id": "msg_123",
        "content": "Here is the answer...",
        "metadata": {
            "model": "gpt-4",
            "tokens": 150,
            "sources": ["doc1", "doc2"]
        }
    },
    "timestamp": "2024-11-24T20:00:00Z"
}
```

### JSON Schema
Define and validate JSON structure:
```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "age": { "type": "integer", "minimum": 0 },
        "email": { "type": "string", "format": "email" }
    },
    "required": ["name", "email"]
}
```

## BAML - Boundary ML Language

### Overview
BAML is a domain-specific language for defining AI interactions, making it easier to work with LLMs in a type-safe, structured way.

### Key Features
- **Type Safety**: Define expected output types
- **Prompt Templates**: Reusable prompt patterns
- **Function Definitions**: Structured AI functions
- **Validation**: Automatic output validation

### Example: BAML Function
```baml
function ExtractUserInfo(text: string) -> UserInfo {
    client GPT4
    prompt #"
        Extract user information from the following text:
        {{ text }}
        
        Return the information in this format:
        {
            "name": "user's name",
            "email": "user's email",
            "phone": "user's phone number"
        }
    "#
}

class UserInfo {
    name string
    email string
    phone string?
}
```

### BAML vs Traditional Prompting

#### Traditional
```python
prompt = f"Extract name from: {text}"
response = llm.generate(prompt)
# Manual parsing and validation needed
```

#### BAML
```python
result = ExtractUserInfo(text)
# Automatically typed and validated
print(result.name)  # Type-safe access
```

### Advanced BAML Patterns

#### Multi-Step Workflows
```baml
function AnalyzeAndSummarize(document: string) -> Analysis {
    client GPT4
    
    // Step 1: Extract key points
    key_points = ExtractKeyPoints(document)
    
    // Step 2: Analyze sentiment
    sentiment = AnalyzeSentiment(document)
    
    // Step 3: Generate summary
    prompt #"
        Based on these key points: {{ key_points }}
        And sentiment: {{ sentiment }}
        Generate a comprehensive summary.
    "#
}
```

#### Retry Logic
```baml
function ExtractData(text: string) -> Data {
    client GPT4
    retry_policy {
        max_retries 3
        on_failure "return_default"
    }
}
```

## Best Practices

### Prompt Engineering
1. **Iterate**: Test and refine prompts
2. **Version Control**: Track prompt changes
3. **A/B Test**: Compare prompt variations
4. **Monitor**: Track success rates

### JSON Handling
1. **Validate**: Use schemas to validate structure
2. **Error Handling**: Handle malformed JSON gracefully
3. **Type Safety**: Use TypeScript or similar
4. **Documentation**: Document expected formats

### BAML Development
1. **Type Everything**: Define clear types
2. **Reuse**: Create reusable components
3. **Test**: Unit test BAML functions
4. **Version**: Track BAML file changes

## Resources
- OpenAI Prompt Engineering: https://platform.openai.com/docs/guides/prompt-engineering
- JSON Schema: https://json-schema.org/
- BAML Documentation: https://docs.boundaryml.com/
- Anthropic Prompt Library: https://docs.anthropic.com/claude/prompt-library
