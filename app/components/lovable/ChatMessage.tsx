import { Message } from '@/lib/mockData';
import { User, Brain } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'glass'
          }`}
        >
          <div className="prose prose-invert prose-sm max-w-none">
            {message.content.split('```').map((part, index) => {
              if (index % 2 === 0) {
                // Regular text
                return (
                  <div key={index} className="whitespace-pre-wrap">
                    {part}
                  </div>
                );
              } else {
                // Code block
                const lines = part.split('\n');
                const language = lines[0];
                const code = lines.slice(1).join('\n');
                
                return (
                  <div key={index} className="my-4">
                    <div className="bg-black/50 rounded-t-lg px-4 py-2 flex items-center justify-between border-b border-border/20">
                      <span className="text-xs text-muted-foreground font-mono">{language}</span>
                    </div>
                    <pre className="bg-black/30 rounded-b-lg p-4 overflow-x-auto">
                      <code className="text-sm font-mono">{code}</code>
                    </pre>
                  </div>
                );
              }
            })}
          </div>
        </div>
        
        {message.thinking && message.thinking.length > 0 && (
          <div className="text-xs text-muted-foreground space-y-1 px-2">
            {message.thinking.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {step}
              </div>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-foreground" />
        </div>
      )}
    </div>
  );
}
