import { memo } from 'react';
import { Cpu, Zap, Sun, Battery, Bot, FlaskConical, Rocket, Search, Command } from 'lucide-react';
import type { IndustryData } from '@/data/semiconductor';

interface TopNavProps {
  industries: IndustryData[];
  currentSlug: string;
  onSelect: (slug: string) => void;
  onSearch: () => void;
  editMode?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={15} />,
  Zap: <Zap size={15} />,
  Sun: <Sun size={15} />,
  Battery: <Battery size={15} />,
  Bot: <Bot size={15} />,
  FlaskConical: <FlaskConical size={15} />,
  Rocket: <Rocket size={15} />,
};

export const TopNav = memo(function TopNav({
  industries,
  currentSlug,
  onSelect,
  onSearch,
  editMode,
}: TopNavProps) {
  return (
    <div className="h-12 bg-canvas-elevated/80 backdrop-blur-md border-b border-border-subtle flex items-center px-4 gap-1 shrink-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-5 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-fg-accent/10 flex items-center justify-center">
          <Cpu size={16} className="text-fg-accent" />
        </div>
        <span className="text-[14px] font-semibold text-fg-primary tracking-tight">
          产业链图谱
        </span>
        {editMode && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-state-error/15 text-state-error font-medium">
            编辑中
          </span>
        )}
      </div>

      {/* Industry Tabs */}
      <div className="flex items-center gap-1">
        {industries.map(ind => {
          const isActive = currentSlug === ind.slug;
          return (
            <button
              key={ind.slug}
              onClick={() => onSelect(ind.slug)}
              className={[
                'relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all',
                isActive
                  ? 'bg-fg-accent/10 text-fg-accent'
                  : 'text-fg-secondary hover:text-fg-primary hover:bg-canvas-surface/60',
              ].join(' ')}
            >
              {iconMap[ind.icon] ?? <Cpu size={15} />}
              <span>{ind.name}</span>
              {/* Active indicator */}
              {isActive && (
                <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-5 h-[2px] bg-fg-accent rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search trigger */}
      <button
        onClick={onSearch}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-canvas-surface/60 hover:bg-canvas-surface border border-border-subtle text-fg-tertiary hover:text-fg-secondary transition-all text-[12px]"
      >
        <Search size={13} />
        <span className="hidden sm:inline">搜索</span>
        <span className="hidden md:flex items-center gap-0.5 text-fg-disabled">
          <Command size={10} />
          <span>K</span>
        </span>
      </button>
    </div>
  );
});

TopNav.displayName = 'TopNav';
