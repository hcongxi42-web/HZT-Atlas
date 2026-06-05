import { memo } from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  id: number;
  name: string;
  level: string;
}

interface BreadcrumbProps {
  path: BreadcrumbItem[];
  onNavigate: (item: BreadcrumbItem | null) => void;
}

const LEVEL_DOT: Record<string, string> = {
  upstream: 'bg-emerald-400',
  midstream: 'bg-blue-400',
  downstream: 'bg-amber-400',
  general: 'bg-violet-400',
};

export const Breadcrumb = memo(function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  return (
    <div className="h-9 bg-canvas-base border-b border-border-subtle flex items-center px-4 gap-1 shrink-0 overflow-x-auto">
      {/* Root */}
      <button
        onClick={() => onNavigate(null)}
        className="flex items-center gap-1 text-[12px] text-fg-tertiary hover:text-fg-primary transition-colors shrink-0"
      >
        <Home size={12} />
        <span>首页</span>
      </button>

      {path.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-1 shrink-0">
          <ChevronRight size={12} className="text-fg-disabled mx-0.5" />
          <button
            onClick={() => onNavigate(item)}
            className={[
              'flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[12px] transition-colors',
              idx === path.length - 1
                ? 'text-fg-primary bg-canvas-surface/60 font-medium'
                : 'text-fg-tertiary hover:text-fg-primary hover:bg-canvas-surface/40',
            ].join(' ')}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_DOT[item.level] ?? 'bg-slate-400'}`} />
            <span>{item.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
