import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Sparkle, Atom, Code, Bug, Lightning } from '@phosphor-icons/react';
import { Message, quickStarters } from '@/lib/mockData';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isThinking: boolean;
}

export function ChatInterface({ messages, onSendMessage, isThinking }: ChatInterfaceProps) {
  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-screen">
      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                <Sparkle size={32} weight="duotone" className="text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                How can I orchestrate your workflow today?
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                GOTI - Generative Orchestrator of Technological Innovation
              </p>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Expert guidance on frameworks, tools, and best practices
              </p>
            </div>

            {/* Quick Starters */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 border-border/50 hover:border-primary/50 transition-all hover:bg-secondary/50"
                onClick={() => onSendMessage('Explain the latest React updates and how they affect my workflow')}
              >
                <Atom size={28} weight="duotone" className="text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Analyze React Update</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Explain the latest React updates and how they affect my workflow
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 border-border/50 hover:border-primary/50 transition-all hover:bg-secondary/50"
                onClick={() => onSendMessage('Help me refactor this codebase for better performance')}
              >
                <Code size={28} weight="duotone" className="text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Refactor Workflow</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Help me refactor this codebase for better performance
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 border-border/50 hover:border-primary/50 transition-all hover:bg-secondary/50"
                onClick={() => onSendMessage('Break down Server Components vs Client Components')}
              >
                <Lightning size={28} weight="duotone" className="text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Explain Concept</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Break down Server Components vs Client Components
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 border-border/50 hover:border-primary/50 transition-all hover:bg-secondary/50"
                onClick={() => onSendMessage('Help me debug this TypeScript type error')}
              >
                <Bug size={28} weight="duotone" className="text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-sm">Debug Issue</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Help me debug this TypeScript type error
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 custom-scrollbar">
          <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="glass px-4 py-3 rounded-2xl max-w-[80%]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-sm">Orchestrating...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {/* Input Area */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ChatInput onSend={onSendMessage} disabled={isThinking} />
        </div>
      </div>
    </div>
  );
}
