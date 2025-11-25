'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'ready' | 'streaming' | 'loading'>('loading');
    const abortControllerRef = useRef<AbortController | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load chat history on mount
    useEffect(() => {
        async function loadHistory() {
            try {
                const response = await fetch('/api/chat/history');
                if (response.ok) {
                    const data = await response.json();
                    if (data.messages && data.messages.length > 0) {
                        setMessages(data.messages);
                    }
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
            } finally {
                setStatus('ready');
            }
        }
        loadHistory();
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status === 'streaming' || status === 'loading') return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setStatus('streaming');

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
                signal: abortController.signal,
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: '',
            };

            setMessages((prev) => [...prev, assistantMessage]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // Raw text stream handling
                assistantMessage.content += chunk;
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...assistantMessage };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setStatus('ready');
            abortControllerRef.current = null;
        }
    };

    return (
        <div className="flex flex-col h-[80vh] w-full max-w-2xl mx-auto border rounded-xl overflow-hidden bg-background shadow-lg">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {status === 'loading' ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Bot className="w-12 h-12 mb-2 animate-pulse" />
                        <p>Loading chat history...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Bot className="w-12 h-12 mb-2" />
                        <p>Hello! I'm GOTI. How can I help you today?</p>
                    </div>
                ) : (
                    <>
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={cn(
                                    "flex w-full",
                                    m.role === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex items-start max-w-[80%] rounded-lg p-3",
                                        m.role === 'user'
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                    )}
                                >
                                    <div className="mr-2 mt-1">
                                        {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className="whitespace-pre-wrap">{m.content}</div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {status === 'streaming' && (
                    <div className="flex justify-start w-full">
                        <div className="bg-muted text-foreground rounded-lg p-3 flex items-center">
                            <Bot size={16} className="mr-2 animate-spin" />
                            <span className="animate-pulse">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
                <div className="flex gap-2">
                    <input
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        disabled={status === 'streaming' || !input.trim()}
                        className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}
