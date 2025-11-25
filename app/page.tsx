import Chat from './components/chat';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">GOTI AI Assistant</h1>
                            <nav className="flex space-x-4">
                                <Link href="/" className="text-blue-600 font-medium">
                                    Chat
                                </Link>
                                <Link href="/knowledge" className="text-gray-600 hover:text-gray-900">
                                    Knowledge Base
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Interface */}
            <div className="max-w-4xl mx-auto">
                <Chat />
            </div>
        </div>
    );
}
