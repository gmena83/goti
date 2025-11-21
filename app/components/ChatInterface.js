"use client";

import { useState, useRef, useEffect } from "react";
import InputBar from "./InputBar";

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "assistant",
            content: "Hello! I am GOTI, your Generative Orchestrator of Technological Innovation. I'm here to help you build and learn. What are we working on today?",
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text, attachments) => {
        if (!text.trim() && attachments.length === 0) return;

        const newUserMessage = {
            id: Date.now(),
            role: "user",
            content: text,
            attachments,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, newUserMessage] }),
            });

            const data = await response.json();

            const newBotMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: data.message,
                // Handle Trello tasks or learning recommendations if present
                actions: data.actions
            };

            setMessages((prev) => [...prev, newBotMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-5xl mx-auto p-4">
            <header className="flex items-center justify-between py-4 border-b border-[var(--glass-border)] mb-4">
                <h1 className="text-2xl font-bold glow-text text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                    GOTI
                </h1>
                <div className="text-sm text-gray-400">Connected to: Activepieces, Lovable, Zapier</div>
            </header>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] p-6 rounded-2xl ${msg.role === "user"
                                    ? "bg-[var(--primary)] text-white rounded-tr-none"
                                    : "glass-panel rounded-tl-none"
                                }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                            {msg.actions && (
                                <div className="mt-4 p-3 bg-black/20 rounded-lg text-sm">
                                    <strong>Suggested Actions:</strong>
                                    <ul className="list-disc list-inside mt-1">
                                        {msg.actions.map((action, idx) => (
                                            <li key={idx}>{action}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="glass-panel p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[var(--secondary)] rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                            <div className="w-2 h-2 bg-[var(--secondary)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-2 h-2 bg-[var(--secondary)] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-4">
                <InputBar onSend={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
}
