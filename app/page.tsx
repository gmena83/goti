import Chat from "./components/chat";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-background">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-8">
                <h1 className="text-4xl font-bold text-center w-full bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GOTI AI Assistant
                </h1>
            </div>
            <Chat />
        </main>
    );
}
