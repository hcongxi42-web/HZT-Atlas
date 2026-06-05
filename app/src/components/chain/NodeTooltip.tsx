import { memo } from 'react';
import { TrendingUp, FolderOpen, ArrowRight, ZoomIn } from 'lucide-react';
import type { ChainNodeData } from './ChainNode';

interface NodeTooltipProps {
  node: ChainNodeData;
  visible: boolean;
  position: { x: number; y: number };
  onViewDetail: (node: ChainNodeData) => void;
  onDrillDown: (node: ChainNodeData) => void;
}

const TIER_FULL: Record<string, string> = {
  upstream: '上游',
  midstream: '中游',
  downstream: '下游',
  general: '通用',
};

const TIER_DOT: Record<string, string> = {
  upstream: 'bg-emerald-400',
  midstream: 'bg-blue-400',
  downstream: 'bg-amber-400',
  general: 'bg-violet-400',
};

export const NodeTooltip = memo(function NodeTooltip({
  node,
  visible,
  position,
  onViewDetail,
  onDrillDown,
}: NodeTooltipProps) {
  if (!visible) return null;

  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        animation: 'slide-in-right 0.15s ease-out-expo',
      }}
    >
      <div className="glass-panel rounded-lg p-3 min-w-[180px] max-w-[240px] pointer-events-auto shadow-canvas-lg">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${TIER_DOT[node.level] ?? 'bg-slate-400'}`} />
          <span className="text-[13px] font-semibold text-fg-primary truncate">
            {node.name}
          </span>
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-canvas-surface text-fg-secondary">
            {TIER_FULL[node.level] ?? node.level}
          </span>
        </div>

        {/* Description */}
        {node.description && (
          <p className="mt-1.5 text-[11px] text-fg-secondary line-clamp-2 leading-relaxed">
            {node.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 mt-2">
          {node.stockCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-fg-tertiary">
              <TrendingUp size={11} className="text-emerald-400" />
              {node.stockCount} 只关联股票
            </span>
          )}
          {node.childCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-fg-tertiary">
              <FolderOpen size={11} className="text-blue-400" />
              {node.childCount} 个子节点
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-border-subtle">
          <button
            onClick={() => onViewDetail(node)}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded bg-canvas-surface hover:bg-canvas-overlay text-[11px] text-fg-secondary hover:text-fg-primary transition-colors"
          >
            <ZoomIn size={11} />
            查看详情
          </button>
          {node.childCount > 0 && (
            <button
              onClick={() => onDrillDown(node)}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded bg-canvas-surface hover:bg-canvas-overlay text-[11px] text-fg-accent hover:text-sky-300 transition-colors"
            >
              <ArrowRight size={11} />
              下钻
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

NodeTooltip.displayName = 'NodeTooltip';
