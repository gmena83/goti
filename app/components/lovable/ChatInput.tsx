import { useState, KeyboardEvent } from 'react';
import { Paperclip, ArrowUp } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-2 flex items-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-muted-foreground hover:text-foreground"
      >
        <Paperclip size={18} weight="bold" />
      </Button>

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask GOTI anything..."
        className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
        disabled={disabled}
      />

      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="icon"
          className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowUp size={18} weight="bold" />
        </Button>
        <span className="text-[10px] text-muted-foreground">⌘↵</span>
      </div>
    </div>
  );
}
