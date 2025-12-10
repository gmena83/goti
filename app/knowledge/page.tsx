'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Document {
    id: string;
    title: string;
    source: string;
    created_at: string;
    updated_at: string;
    chunk_count: number;
}

interface Stats {
    totalDocuments: number;
    totalChunks: number;
    documentsBySource: Record<string, number>;
    recentUploads: number;
}

export default function KnowledgeBasePage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [sources, setSources] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters and pagination
    const [search, setSearch] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const fetchDocuments = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                ...(search && { search }),
                ...(selectedSource && { source: selectedSource })
            });

            const response = await fetch(`/api/documents/list?${params}`);
            const data = await response.json();

            setDocuments(data.documents || []);
            setTotalPages(data.pagination?.totalPages || 1);
            setSources(data.sources || []);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    }, [page, search, selectedSource]);

    const fetchStats = useCallback(async () => {
        try {
            const response = await fetch('/api/documents/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
        fetchStats();
    }, [fetchDocuments, fetchStats]);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const response = await fetch('/api/documents/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                fetchDocuments();
                fetchStats();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">GOTI Knowledge Base</h1>
                            <nav className="flex space-x-4">
                                <Link href="/" className="text-gray-600 hover:text-gray-900">
                                    Chat
                                </Link>
                                <Link href="/knowledge" className="text-blue-600 font-medium">
                                    Knowledge Base
                                </Link>
                            </nav>
                        </div>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ➕ Upload Document
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats */}
            {stats && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-sm text-gray-600">Total Documents</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-sm text-gray-600">Total Chunks</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.totalChunks}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-sm text-gray-600">Recent Uploads</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.recentUploads}</div>
                            <div className="text-xs text-gray-500">Last 7 days</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-sm text-gray-600">Sources</div>
                            <div className="text-2xl font-bold text-gray-900">{Object.keys(stats.documentsBySource).length}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-white p-4 rounded-lg shadow flex gap-4">
                    <input
                        type="text"
                        placeholder="🔍 Search documents..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={selectedSource}
                        onChange={(e) => {
                            setSelectedSource(e.target.value);
                            setPage(1);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Sources</option>
                        {sources.map(source => (
                            <option key={source} value={source}>{source}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Vibecoding Tutorials Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Vibecoding Tutorials</h2>
                            <p className="text-gray-600">76 comprehensive guides across 14 platforms</p>
                        </div>
                        <a
                            href="/docs/vibecoding-tutorials/README.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            View All Tutorials
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-4">
                        <a href="/docs/vibecoding-tutorials/antigravity" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <div className="text-sm font-semibold text-gray-900">Antigravity</div>
                            <div className="text-xs text-gray-500">7 tutorials</div>
                        </a>
                        <a href="/docs/vibecoding-tutorials/base44" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <div className="text-sm font-semibold text-gray-900">Base44</div>
                            <div className="text-xs text-gray-500">9 tutorials</div>
                        </a>
                        <a href="/docs/vibecoding-tutorials/bolt" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <div className="text-sm font-semibold text-gray-900">Bolt</div>
                            <div className="text-xs text-gray-500">5 tutorials</div>
                        </a>
                        <a href="/docs/vibecoding-tutorials/cursor" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <div className="text-sm font-semibold text-gray-900">Cursor</div>
                            <div className="text-xs text-gray-500">6 tutorials</div>
                        </a>
                        <a href="/docs/vibecoding-tutorials/lovable" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <div className="text-sm font-semibold text-gray-900">Lovable</div>
                            <div className="text-xs text-gray-500">5 tutorials</div>
                        </a>
                        <a href="/docs/vibecoding-tutorials/n8n" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <div className="text-sm font-semibold text-gray-900">n8n</div>
                            <div className="text-xs text-gray-500">5 tutorials</div>
                        </a>
                        <a href="/docs/vibecoding-tutorials/multiple" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition-shadow text-center">
                            <div className="text-sm font-semibold text-gray-900">Comparisons</div>
                            <div className="text-xs text-gray-500">22 guides</div>
                        </a>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <strong>💡 Tip:</strong> Ask GOTI about any vibecoding platform! Try: &quot;Show me Cursor tutorials&quot; or &quot;Compare Lovable vs Bolt&quot;
                    </div>
                </div>
            </div>

            {/* Documents Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {loading ? (
                        <div className="p-8">
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-3 py-1">
                                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No documents found. Upload your first document to get started!
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Source
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Chunks
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {doc.source}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {doc.chunk_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(doc.id, doc.title)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Page <span className="font-medium">{page}</span> of{' '}
                                        <span className="font-medium">{totalPages}</span>
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <UploadModal
                    onClose={() => setShowUploadModal(false)}
                    onSuccess={() => {
                        setShowUploadModal(false);
                        fetchDocuments();
                        fetchStats();
                    }}
                />
            )}
        </div>
    );
}

// Upload Modal Component
function UploadModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [title, setTitle] = useState('');
    const [source, setSource] = useState('');
    const [content, setContent] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !source || !content) {
            alert('Please fill in all fields');
            return;
        }

        setUploading(true);
        try {
            const response = await fetch('/api/documents/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, source, content })
            });

            if (response.ok) {
                onSuccess();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Failed to upload document');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Upload Document</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Python Best Practices"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Source
                            </label>
                            <input
                                type="text"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                placeholder="e.g., Python Documentation"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Paste your document content here (markdown supported)..."
                                rows={12}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                disabled={uploading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
