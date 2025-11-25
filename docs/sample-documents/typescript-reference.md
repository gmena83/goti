# TypeScript - Type-Safe JavaScript

## Why It Matters
TypeScript adds type safety to JavaScript, making it ideal for building robust web applications, APIs, and AI interfaces. Essential for Next.js, React, and modern web development.

## Key Features

### Type System
```typescript
// Basic types
let name: string = "GOTI";
let count: number = 42;
let isActive: boolean = true;

// Arrays and objects
let items: string[] = ["a", "b", "c"];
let config: { apiKey: string; model: string } = {
    apiKey: "sk-...",
    model: "gpt-4"
};

// Union types
let result: string | number = "success";

// Optional properties
interface User {
    id: string;
    name: string;
    email?: string;  // Optional
}
```

### Interfaces and Types
```typescript
// Interface for API response
interface ChatResponse {
    id: string;
    message: string;
    role: "user" | "assistant";
    timestamp: Date;
}

// Type for function
type ProcessFunction = (input: string) => Promise<string>;

// Generic types
interface ApiResponse<T> {
    data: T;
    error?: string;
    status: number;
}
```

## Common Patterns for AI Applications

### API Client
```typescript
class OpenAIClient {
    private apiKey: string;
    
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }
    
    async chat(messages: Message[]): Promise<ChatResponse> {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages, model: 'gpt-4' })
        });
        
        return response.json();
    }
}
```

### React Components with AI
```typescript
import { useState } from 'react';

interface ChatProps {
    initialMessages?: Message[];
}

export function Chat({ initialMessages = [] }: ChatProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState<string>('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newMessage: Message = {
            role: 'user',
            content: input
        };
        
        setMessages([...messages, newMessage]);
        // Call API...
    };
    
    return (
        // JSX...
    );
}
```

### Next.js API Routes
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        
        // Process with type safety
        const response = await processMessages(messages);
        
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
```

## Advanced Features

### Generics
```typescript
function createArray<T>(length: number, value: T): T[] {
    return Array(length).fill(value);
}

const numbers = createArray<number>(3, 0);  // [0, 0, 0]
const strings = createArray<string>(2, "hi");  // ["hi", "hi"]
```

### Utility Types
```typescript
// Partial - make all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Record - create object type
type ErrorMessages = Record<string, string>;
```

### Async/Await with Types
```typescript
async function fetchUserData(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    
    return response.json();
}
```

## Best Practices

### Strict Mode
```json
// tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}
```

### Type Guards
```typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

if (isString(input)) {
    // TypeScript knows input is string here
    console.log(input.toUpperCase());
}
```

### Enums
```typescript
enum MessageRole {
    User = 'user',
    Assistant = 'assistant',
    System = 'system'
}

const role: MessageRole = MessageRole.User;
```

## Framework Integration

### Next.js 14+
- App Router with TypeScript
- Server Components
- API Routes with type safety

### React
- Typed props and state
- Custom hooks with generics
- Event handlers with proper types

### Node.js
- Express with TypeScript
- Type-safe middleware
- Typed environment variables

## Resources
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Next.js TypeScript: https://nextjs.org/docs/app/building-your-application/configuring/typescript
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app/
