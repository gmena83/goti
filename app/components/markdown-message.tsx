'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import 'highlight.js/styles/vs2015.css';

interface MarkdownMessageProps {
    content: string;
    className?: string;
}

export default function MarkdownMessage({ content, className = '' }: MarkdownMessageProps) {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = async (code: string, id: string) => {
        await navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className={`markdown-content ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Code blocks with syntax highlighting
                    code({ node, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        // Helper to extract text from React children (handles nested elements from highlight plugins)
                        const extractText = (node: any): string => {
                            if (typeof node === 'string') return node;
                            if (typeof node === 'number') return String(node);
                            if (!node) return '';
                            if (Array.isArray(node)) return node.map(extractText).join('');
                            if (node.props?.children) return extractText(node.props.children);
                            return '';
                        };

                        const codeString = extractText(children).replace(/\n$/, '');
                        const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
                        const inline = !className || !match;

                        if (!inline && language) {
                            return (
                                <div className="relative group my-4">
                                    <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
                                        <span className="text-xs text-gray-400 font-mono uppercase">{language}</span>
                                        <button
                                            onClick={() => copyToClipboard(codeString, codeId)}
                                            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedCode === codeId ? (
                                                <>
                                                    <Check size={14} />
                                                    <span>Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <SyntaxHighlighter
                                        style={vscDarkPlus as any}
                                        language={language}
                                        PreTag="div"
                                        className="!mt-0 !rounded-t-none"
                                        {...props}
                                    >
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            );
                        }

                        // Inline code
                        return (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props}>
                                {children}
                            </code>
                        );
                    },

                    // Links with external icon
                    a({ node, children, href, ...props }: any) {
                        const isExternal = href?.startsWith('http');
                        return (
                            <a
                                href={href}
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors inline-flex items-center gap-1"
                                {...props}
                            >
                                {children}
                                {isExternal && <ExternalLink size={12} className="inline" />}
                            </a>
                        );
                    },

                    // Headings
                    h1({ node, children, ...props }: any) {
                        return (
                            <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground border-b border-border pb-2" {...props}>
                                {children}
                            </h1>
                        );
                    },
                    h2({ node, children, ...props }: any) {
                        return (
                            <h2 className="text-xl font-bold mt-5 mb-3 text-foreground" {...props}>
                                {children}
                            </h2>
                        );
                    },
                    h3({ node, children, ...props }: any) {
                        return (
                            <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground" {...props}>
                                {children}
                            </h3>
                        );
                    },

                    // Lists
                    ul({ node, children, ...props }: any) {
                        return (
                            <ul className="list-disc list-inside space-y-1 my-3 ml-4" {...props}>
                                {children}
                            </ul>
                        );
                    },
                    ol({ node, children, ...props }: any) {
                        return (
                            <ol className="list-decimal list-inside space-y-1 my-3 ml-4" {...props}>
                                {children}
                            </ol>
                        );
                    },
                    li({ node, children, ...props }: any) {
                        return (
                            <li className="text-foreground" {...props}>
                                {children}
                            </li>
                        );
                    },

                    // Blockquotes
                    blockquote({ node, children, ...props }: any) {
                        return (
                            <blockquote className="border-l-4 border-primary pl-4 py-2 my-3 italic text-muted-foreground bg-muted/30 rounded-r" {...props}>
                                {children}
                            </blockquote>
                        );
                    },

                    // Tables
                    table({ node, children, ...props }: any) {
                        return (
                            <div className="overflow-x-auto my-4">
                                <table className="min-w-full divide-y divide-border" {...props}>
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    thead({ node, children, ...props }: any) {
                        return (
                            <thead className="bg-muted" {...props}>
                                {children}
                            </thead>
                        );
                    },
                    th({ node, children, ...props }: any) {
                        return (
                            <th className="px-4 py-2 text-left text-sm font-semibold text-foreground" {...props}>
                                {children}
                            </th>
                        );
                    },
                    td({ node, children, ...props }: any) {
                        return (
                            <td className="px-4 py-2 text-sm text-foreground border-t border-border" {...props}>
                                {children}
                            </td>
                        );
                    },

                    // Paragraphs
                    p({ node, children, ...props }: any) {
                        return (
                            <p className="my-3 text-foreground leading-relaxed" {...props}>
                                {children}
                            </p>
                        );
                    },

                    // Horizontal rule
                    hr({ node, ...props }: any) {
                        return <hr className="my-6 border-border" {...props} />;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
