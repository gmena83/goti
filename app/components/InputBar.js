"use client";

import { useState } from "react";

export default function InputBar({ onSend, isLoading }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() || isLoading) return;
        onSend(text, []);
        setText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel p-2 flex items-end gap-2 relative">
            <div className="flex gap-2 p-2">
                <button
                    type="button"
                    className="text-gray-400 hover:text-[var(--secondary)] transition-colors"
                    title="Upload Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                </button>
                <button
                    type="button"
                    className="text-gray-400 hover:text-[var(--secondary)] transition-colors"
                    title="Voice Input"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                </button>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask GOTI anything..."
                className="flex-1 bg-transparent border-none outline-none text-[var(--foreground)] resize-none py-3 max-h-32 custom-scrollbar"
                rows={1}
                style={{ minHeight: "48px" }}
            />

            <button
                type="submit"
                disabled={isLoading || !text.trim()}
                className="btn-primary mb-1 p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
        </form>
    );
}
