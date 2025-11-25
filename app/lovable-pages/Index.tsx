import { useState } from 'react';
import { GotiSidebar } from '@/app/components/lovable/GotiSidebar';
import { ChatInterface } from '@/app/components/lovable/ChatInterface';
import { ContextPanel } from '@/app/components/lovable/ContextPanel';
import { MetricsBar } from '@/app/components/lovable/MetricsBar';
import { Message, mockConversations } from '@/lib/mockData';

const Index = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleNewChat = () => {
    setActiveConversationId(undefined);
    setMessages([]);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    const conversation = mockConversations.find((c) => c.id === id);
    setMessages(conversation?.messages || []);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: `I understand you're asking about "${content}". Let me help you with that.

This is a mock response. In production, this would connect to a real AI backend that would:

1. Analyze your query
2. Search relevant documentation
3. Check tool changelogs
4. Generate a comprehensive response

Here's an example code snippet:

\`\`\`typescript
// Example implementation
function orchestrateWorkflow() {
  return "Building amazing things with GOTI";
}
\`\`\`

Would you like me to elaborate on any specific aspect?`,
        timestamp: new Date(),
        thinking: ['Analyzing query...', 'Searching knowledge base...', 'Generating response...'],
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      <GotiSidebar
        onNewChat={handleNewChat}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MetricsBar />
        <div className="flex-1 overflow-hidden">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isThinking={isThinking}
          />
        </div>
      </div>

      <ContextPanel />
    </div>
  );
};

export default Index;
