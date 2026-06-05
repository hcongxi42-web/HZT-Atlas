import { memo, forwardRef } from 'react';
import { ChevronRight, TrendingUp, FolderOpen } from 'lucide-react';

export interface ChainNodeData {
  id: number;
  name: string;
  level: string;
  description: string | null;
  plainLanguageDescription?: string | null;
  x: number;
  y: number;
  stockCount: number;
  childCount: number;
  isCrossIndustry?: boolean;
}

interface ChainNodeProps {
  node: ChainNodeData;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  editMode: boolean;
  onSelect: (node: ChainNodeData) => void;
  onDoubleClick: (node: ChainNodeData) => void;
  onMouseDown: (e: React.MouseEvent, nodeId: number) => void;
  onContextMenu: (e: React.MouseEvent, nodeId: number) => void;
  onAnchorMouseDown?: (e: React.MouseEvent, nodeId: number, side: 'top' | 'bottom' | 'left' | 'right') => void;
}

const TIER_LABELS: Record<string, string> = {
  upstream: '上',
  midstream: '中',
  downstream: '下',
  general: '通',
};

const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  upstream: { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
  midstream: { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  downstream: { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  general: { bg: 'bg-violet-500/15', text: 'text-violet-400' },
};

export const ChainNode = memo(forwardRef<HTMLDivElement, ChainNodeProps>(
  function ChainNode(
    { node, isSelected, isHighlighted, isDimmed, editMode, onSelect, onDoubleClick, onMouseDown, onContextMenu, onAnchorMouseDown },
    ref
  ) {
    const tierStyle = TIER_COLORS[node.level] ?? TIER_COLORS.general;

    return (
      <div
        ref={ref}
        data-node-id={node.id}
        className={[
          'chain-node',
          `node-${node.level}`,
          isSelected ? 'selected' : '',
          isHighlighted ? 'highlighted' : '',
          isDimmed ? 'dimmed' : '',
          node.childCount > 0 ? 'has-children' : '',
          node.isCrossIndustry ? 'cross-industry' : '',
        ].filter(Boolean).join(' ')}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 152,
          transform: `translate(${node.x}px, ${node.y}px)`,
          pointerEvents: isDimmed ? 'none' : 'auto',
        }}
        onClick={() => onSelect(node)}
        onDoubleClick={() => !node.isCrossIndustry && node.childCount > 0 && onDoubleClick(node)}
        onMouseDown={(e) => onMouseDown(e, node.id)}
        onContextMenu={(e) => editMode && onContextMenu(e, node.id)}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={node.childCount > 0}
        tabIndex={0}
      >
        {/* 编辑模式锚点 */}
        {editMode && (
          <>
            <div
              className="anchor-dot"
              style={{ top: -3, left: '50%', transform: 'translateX(-50%)' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                onAnchorMouseDown?.(e, node.id, 'top');
              }}
            />
            <div
              className="anchor-dot"
              style={{ bottom: -3, left: '50%', transform: 'translateX(-50%)' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                onAnchorMouseDown?.(e, node.id, 'bottom');
              }}
            />
            <div
              className="anchor-dot"
              style={{ left: -3, top: '50%', transform: 'translateY(-50%)' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                onAnchorMouseDown?.(e, node.id, 'left');
              }}
            />
            <div
              className="anchor-dot"
              style={{ right: -3, top: '50%', transform: 'translateY(-50%)' }}
              onMouseDown={(e) => {
                e.stopPropagation();
                onAnchorMouseDown?.(e, node.id, 'right');
              }}
            />
          </>
        )}

        {/* 节点内容 */}
        <div className="px-3 py-2.5">
          {/* 顶部：名称 + 层级 + 下钻指示 */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`shrink-0 text-[9px] font-bold px-1 py-0.5 rounded ${tierStyle.bg} ${tierStyle.text}`}>
              {TIER_LABELS[node.level] ?? '通'}
            </span>
            <span className="text-[13px] font-semibold text-fg-primary truncate leading-tight">
              {node.name}
            </span>
            {node.childCount > 0 && (
              <ChevronRight size={12} className="shrink-0 text-fg-tertiary opacity-60" />
            )}
          </div>

          {/* 大白话解读（优先展示） */}
          {node.plainLanguageDescription && (
            <div className="mt-1 text-[10px] text-amber-200/60 truncate leading-relaxed">
              {node.plainLanguageDescription}
            </div>
          )}

          {/* 专业描述（fallback） */}
          {!node.plainLanguageDescription && node.description && (
            <div className="mt-1 text-[10px] text-fg-tertiary truncate leading-relaxed">
              {node.description}
            </div>
          )}

          {/* 底部指标 */}
          <div className="flex items-center gap-2 mt-1.5">
            {node.stockCount > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-fg-tertiary">
                <TrendingUp size={9} className="text-emerald-400/70" />
                {node.stockCount}股
              </span>
            )}
            {node.childCount > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-fg-tertiary">
                <FolderOpen size={9} className="text-blue-400/70" />
                {node.childCount}子
              </span>
            )}
          </div>
        </div>

        {/* 选中时底部指示条 */}
        {isSelected && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-fg-accent/30" />
        )}
      </div>
    );
  }
));

ChainNode.displayName = 'ChainNode';
