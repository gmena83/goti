'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw, Wrench, Lightbulb, Bug, Paperclip, X, Mic } from 'lucide-react';
import { cn } from '../../lib/utils';
import QuickActionCard from './quick-action-card';
import MarkdownMessage from './markdown-message';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    image?: string | null;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'ready' | 'streaming' | 'loading'>('loading');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const abortControllerRef = useRef<AbortController | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
                await handleTranscribe(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please ensure you have granted permission.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleTranscribe = async (audioBlob: Blob) => {
        setIsTranscribing(true);
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.webm');

            const response = await fetch('/api/audio/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Transcription failed');
            }

            const data = await response.json();
            if (data.text) {
                setInput((prev) => prev + (prev ? ' ' : '') + data.text);
            }
        } catch (error) {
            console.error('Error transcribing audio:', error);
        } finally {
            setIsTranscribing(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !selectedImage) || status === 'streaming' || status === 'loading' || isTranscribing) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: input,
            image: selectedImage
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setSelectedImage(null);
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
                    image: userMessage.image
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
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {status === 'loading' ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Bot className="w-12 h-12 mb-2 animate-pulse" />
                        <p>Loading chat history...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full">
                        {/* Welcome Message */}
                        <div className="text-center mb-12 animate-fade-in">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Bot className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                How can I orchestrate your workflow today?
                            </h1>
                            <p className="text-muted-foreground">
                                GOTI - Generative Orchestrator of Technological Innovation
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Expert guidance on frameworks, tools, and best practices
                            </p>
                        </div>

                        {/* Quick Action Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                            <QuickActionCard
                                icon={RefreshCw}
                                title="Analyze React Update"
                                description="Explain the latest React updates and how they affect my project"
                                onClick={() => setInput("Explain the latest React updates and how they affect my project")}
                            />
                            <QuickActionCard
                                icon={Wrench}
                                title="Refactor Workflow"
                                description="Help me refactor this codebase for better performance"
                                onClick={() => setInput("Help me refactor this codebase for better performance")}
                            />
                            <QuickActionCard
                                icon={Lightbulb}
                                title="Explain Concept"
                                description="Break down Server Components vs Client Components"
                                onClick={() => setInput("Break down Server Components vs Client Components")}
                            />
                            <QuickActionCard
                                icon={Bug}
                                title="Debug Issue"
                                description="Help me debug this TypeScript type error"
                                onClick={() => setInput("Help me debug this TypeScript type error")}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={cn(
                                    "flex w-full animate-fade-in",
                                    m.role === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex items-start max-w-[80%] rounded-lg p-4",
                                        m.role === 'user'
                                            ? "bg-primary text-primary-foreground"
                                            : "glass text-foreground"
                                    )}
                                >
                                    <div className="mr-3 mt-1 flex-shrink-0">
                                        {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                                    </div>
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        {m.image && (
                                            <div className="mb-2">
                                                <img src={m.image} alt="User upload" className="max-w-full rounded-lg border border-border/50" />
                                            </div>
                                        )}
                                        {m.role === 'user' ? (
                                            <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                                        ) : (
                                            <MarkdownMessage content={m.content} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {status === 'streaming' && (
                    <div className="flex justify-start w-full">
                        <div className="glass text-foreground rounded-lg p-4 flex items-center">
                            <Bot size={18} className="mr-3 animate-spin" />
                            <span className="animate-pulse text-sm">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-background">
                <div className="max-w-4xl mx-auto">
                    {selectedImage && (
                        <div className="mb-4 relative inline-block animate-fade-in">
                            <img src={selectedImage} alt="Selected" className="h-20 w-20 object-cover rounded-lg border border-border" />
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                            title="Upload image"
                        >
                            <Paperclip size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            className={cn(
                                "p-3 transition-colors rounded-lg hover:bg-muted",
                                isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-foreground",
                                isTranscribing && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isTranscribing}
                            title={isRecording ? "Stop recording" : "Start recording"}
                        >
                            <Mic size={20} />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            accept="image/*"
                            className="hidden"
                        />
                        <input
                            className="flex-1 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
                            value={isTranscribing ? "Transcribing..." : input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isTranscribing}
                        />
                        <button
                            type="submit"
                            disabled={status === 'streaming' || (!input.trim() && !selectedImage) || isTranscribing}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
