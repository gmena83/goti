import { Code, Bug, RocketLaunch, Clock, ChatCircle, Wrench } from '@phosphor-icons/react';

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

const MetricCard = ({ icon, value, label }: MetricCardProps) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
    <div className="text-primary">{icon}</div>
    <div className="flex flex-col">
      <span className="text-lg font-semibold text-foreground">{value.toLocaleString()}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  </div>
);

export const MetricsBar = () => {
  // Mock data - will be replaced with real tracking later
  const metrics = {
    linesOfCode: 12847,
    bugsFound: 47,
    productsShipped: 3,
    hoursVibecoding: 156,
    conversations: 89,
    toolsTracked: 12,
  };

  return (
    <div className="glass-strong px-6 py-4 mb-4 mx-4 rounded-xl">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          icon={<Code size={20} weight="duotone" />}
          value={metrics.linesOfCode}
          label="Lines of Code"
        />
        <MetricCard
          icon={<Bug size={20} weight="duotone" />}
          value={metrics.bugsFound}
          label="Bugs Found"
        />
        <MetricCard
          icon={<RocketLaunch size={20} weight="duotone" />}
          value={metrics.productsShipped}
          label="Products Shipped"
        />
        <MetricCard
          icon={<Clock size={20} weight="duotone" />}
          value={metrics.hoursVibecoding}
          label="Hours Vibecoding"
        />
        <MetricCard
          icon={<ChatCircle size={20} weight="duotone" />}
          value={metrics.conversations}
          label="Conversations"
        />
        <MetricCard
          icon={<Wrench size={20} weight="duotone" />}
          value={metrics.toolsTracked}
          label="Tools Tracked"
        />
      </div>
    </div>
  );
};
