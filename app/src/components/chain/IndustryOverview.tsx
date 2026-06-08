import { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Zap, Battery, Bot, Rocket, Pickaxe } from 'lucide-react';

export interface IndustryOverviewData {
  name: string;
  icon: string;
  overviewSummary?: string;
  overviewArchitecture?: string;
  overviewHighlights?: string[];
}

interface IndustryOverviewProps {
  data: IndustryOverviewData | null;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Cpu,
  Zap,
  Battery,
  Bot,
  Rocket,
  Pickaxe,
};

function resolveIcon(iconName: string) {
  const Icon = ICON_MAP[iconName];
  return Icon ? <Icon size={18} className="text-fg-accent shrink-0" /> : null;
}

export function IndustryOverview({ data }: IndustryOverviewProps) {
  const [expanded, setExpanded] = useState(true);

  if (!data || !data.overviewSummary) return null;

  const hasArchitecture = !!data.overviewArchitecture;
  const hasHighlights = (data.overviewHighlights?.length ?? 0) > 0;

  return (
    <div className="industry-overview mx-3 mt-2 mb-0">
      {/* Header Bar — always visible */}
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-t-lg
                   bg-canvas-surface border border-border-default hover:bg-canvas-overlay/50
                   transition-colors duration-200 group cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {resolveIcon(data.icon)}
          <span className="text-fg-primary font-semibold text-[13px] truncate">
            {data.name}产业链概览
          </span>
          <span className="text-[11px] text-fg-tertiary hidden sm:inline truncate">
            {data.overviewSummary.slice(0, 60).replace(/\n/g, ' ')}...
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-fg-tertiary group-hover:text-fg-secondary transition-colors">
            {expanded ? '收起' : '展开'}
          </span>
          {expanded ? (
            <ChevronUp size={14} className="text-fg-tertiary group-hover:text-fg-secondary transition-colors" />
          ) : (
            <ChevronDown size={14} className="text-fg-tertiary group-hover:text-fg-secondary transition-colors" />
          )}
        </div>
      </button>

      {/* Content — expandable */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3.5 border-x border-b border-border-default rounded-b-lg bg-canvas-elevated/60 space-y-4">
          {/* Summary */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-semibold text-fg-tertiary uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-fg-accent" />
              什么是{data.name}？
            </h4>
            <p className="text-[12px] text-fg-secondary leading-relaxed whitespace-pre-line">
              {data.overviewSummary}
            </p>
          </div>

          {/* Architecture */}
          {hasArchitecture && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-semibold text-fg-tertiary uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1 h-3 rounded-full bg-emerald-400" />
                产业链架构
              </h4>
              <p className="text-[12px] text-fg-secondary leading-relaxed whitespace-pre-line">
                {data.overviewArchitecture}
              </p>
            </div>
          )}

          {/* Highlights */}
          {hasHighlights && (
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-semibold text-fg-tertiary uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1 h-3 rounded-full bg-amber-400" />
                关键数据
              </h4>
              <ul className="space-y-1">
                {data.overviewHighlights!.map((h, i) => (
                  <li key={i} className="text-[12px] text-fg-secondary leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400/60 mt-0.5 shrink-0">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
