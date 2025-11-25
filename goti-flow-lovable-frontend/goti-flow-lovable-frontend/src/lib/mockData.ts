export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
}

export interface ToolUpdate {
  id: string;
  tool: string;
  version: string;
  date: Date;
  summary: string;
  icon: string;
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'React 19 Migration Guide',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Help me understand the React 19 migration path',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: 'm2',
        role: 'assistant',
        content: `React 19 introduces several key changes:

1. **Automatic Batching**: Updates are now batched by default
2. **Server Components**: Built-in support for RSC
3. **Actions**: New pattern for handling async operations

Here's a migration example:

\`\`\`tsx
// Before (React 18)
function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
}

// After (React 19)
function Component() {
  const data = use(fetchData());
}
\`\`\``,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        thinking: ['Reading React 19 docs...', 'Analyzing migration patterns...', 'Generating response...'],
      },
    ],
  },
  {
    id: '2',
    title: 'TypeScript Utility Types',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messages: [],
  },
  {
    id: '3',
    title: 'Next.js App Router Best Practices',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    messages: [],
  },
];

export const mockToolUpdates: ToolUpdate[] = [
  {
    id: '1',
    tool: 'Next.js',
    version: '14.2.0',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    summary: 'Improved turbopack performance and new caching strategies',
    icon: '⚡',
  },
  {
    id: '2',
    tool: 'Supabase',
    version: '2.38.0',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    summary: 'Vector database updates and edge function improvements',
    icon: '🔧',
  },
  {
    id: '3',
    tool: 'OpenAI',
    version: 'GPT-4 Turbo',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72),
    summary: 'Enhanced context window and improved reasoning capabilities',
    icon: '🤖',
  },
  {
    id: '4',
    tool: 'Vercel',
    version: 'Platform Update',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96),
    summary: 'New deployment analytics and performance insights',
    icon: '▲',
  },
  {
    id: '5',
    tool: 'TypeScript',
    version: '5.4.0',
    date: new Date(Date.now() - 1000 * 60 * 60 * 120),
    summary: 'NoInfer utility type and improved type inference',
    icon: '📘',
  },
];

export const quickStarters = [
  {
    id: '1',
    title: 'Analyze React Update',
    icon: '⚛️',
    prompt: 'Explain the latest React updates and how they affect my workflow',
  },
  {
    id: '2',
    title: 'Refactor Workflow',
    icon: '🔄',
    prompt: 'Help me refactor this codebase for better performance',
  },
  {
    id: '3',
    title: 'Explain Concept',
    icon: '💡',
    prompt: 'Break down Server Components vs Client Components',
  },
  {
    id: '4',
    title: 'Debug Issue',
    icon: '🐛',
    prompt: 'Help me debug this TypeScript type error',
  },
];
