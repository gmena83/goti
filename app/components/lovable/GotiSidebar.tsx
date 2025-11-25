import { useState, useEffect } from 'react';
import { Brain, Plus, ClockCounterClockwise, Eye, Gear, UserCircle, SignOut } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { mockConversations } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface GotiSidebarProps {
  onNewChat: () => void;
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
}

export function GotiSidebar({ onNewChat, activeConversationId, onSelectConversation }: GotiSidebarProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const groupConversationsByDate = () => {
    const today: typeof mockConversations = [];
    const yesterday: typeof mockConversations = [];
    const older: typeof mockConversations = [];

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    mockConversations.forEach((conv) => {
      if (conv.date >= todayStart) {
        today.push(conv);
      } else if (conv.date >= yesterdayStart) {
        yesterday.push(conv);
      } else {
        older.push(conv);
      }
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = groupConversationsByDate();

  const ConversationGroup = ({ title, conversations }: { title: string; conversations: typeof mockConversations }) => {
    if (conversations.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all ${
                activeConversationId === conv.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <div className="truncate font-medium">{conv.title}</div>
              <div className={`text-xs mt-1 ${
                activeConversationId === conv.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {formatDistanceToNow(conv.date, { addSuffix: true })}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside className="glass-strong w-64 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Brain size={24} weight="duotone" className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-gradient">GOTI</h1>
          <p className="text-xs text-muted-foreground leading-tight">
            Generative Orchestrator of<br />Technological Innovation
          </p>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* New Chat Button */}
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus size={18} weight="bold" className="mr-2" />
          New Chat
        </Button>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-1">
        <Button variant="ghost" className="w-full justify-start text-foreground">
          <ClockCounterClockwise size={18} weight="duotone" className="mr-2" />
          Library
        </Button>
        <Button variant="ghost" className="w-full justify-start text-foreground">
          <Eye size={18} weight="duotone" className="mr-2" />
          Tool Watch
        </Button>
      </nav>

      <Separator className="my-4 bg-border/50" />

      {/* Conversation History */}
      <ScrollArea className="flex-1 px-4 custom-scrollbar">
        <ConversationGroup title="Today" conversations={today} />
        <ConversationGroup title="Yesterday" conversations={yesterday} />
        <ConversationGroup title="Older" conversations={older} />
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserCircle size={20} weight="duotone" className="text-primary-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'You'}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <Gear size={16} weight="duotone" />
              Settings
            </Button>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="flex-1 justify-start gap-2 text-muted-foreground hover:text-destructive"
            >
              <SignOut size={16} weight="bold" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
