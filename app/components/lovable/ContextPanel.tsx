import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { mockToolUpdates } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Sparkles, ExternalLink } from 'lucide-react';

export function ContextPanel() {
  return (
    <aside className="glass-strong w-80 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Tool Watch</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Latest updates from your tech stack
        </p>
      </div>

      {/* Tool Updates Feed */}
      <ScrollArea className="flex-1 p-4 custom-scrollbar">
        <div className="space-y-3">
          {mockToolUpdates.map((update) => (
            <Card
              key={update.id}
              className="p-4 bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0 mt-1">{update.icon}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm truncate">
                      {update.tool}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-xs flex-shrink-0 bg-primary/10 text-primary border-primary/20"
                    >
                      {update.version}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {update.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(update.date, { addSuffix: true })}
                    </span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Action */}
      <div className="p-4 border-t border-border/50">
        <button className="w-full py-2 px-4 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">
          Configure Watch List
        </button>
      </div>
    </aside>
  );
}
