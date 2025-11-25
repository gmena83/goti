import Chat from './components/chat';
import AppLayout from './components/app-layout';
import SidebarNav from './components/sidebar-nav';
import MetricsBar from './components/metrics-bar';
import ToolWatchPanel from './components/tool-watch-panel';

export default function Home() {
    return (
        <AppLayout
            sidebar={<SidebarNav />}
            toolWatch={<ToolWatchPanel />}
        >
            <MetricsBar />
            <div className="flex-1 overflow-hidden">
                <Chat />
            </div>
        </AppLayout>
    );
}
