import { useState } from 'react';
import { X, TrendingUp, FolderOpen, ChevronRight, ArrowRight, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface Stock {
  id: number;
  name: string;
  code: string;
  tag: string;
  description?: string;
}

interface ChildNode {
  id: number;
  name: string;
  level: string;
  description: string | null;
  stockCount: number;
}

interface NodeDetailProps {
  nodeId: number;
  nodeName: string;
  nodeLevel: string;
  description: string | null;
  plainLanguageDescription?: string | null;
  stocks: Stock[];
  children: ChildNode[];
  onClose: () => void;
  onDrillDown: (nodeId: number, nodeName: string, nodeLevel: string) => void;
  onDeleteNode?: (nodeId: number) => void;
  editMode?: boolean;
}

const LEVEL_LABELS: Record<string, string> = {
  upstream: '上游',
  midstream: '中游',
  downstream: '下游',
  general: '通用',
};

const LEVEL_STYLES: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  upstream: {
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    dot: 'bg-emerald-400',
  },
  midstream: {
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    dot: 'bg-blue-400',
  },
  downstream: {
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    dot: 'bg-amber-400',
  },
  general: {
    border: 'border-violet-500/40',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    dot: 'bg-violet-400',
  },
};

export default function NodeDetail({
  nodeId,
  nodeName,
  nodeLevel,
  description,
  plainLanguageDescription,
  stocks,
  children,
  onClose,
  onDrillDown,
  onDeleteNode,
  editMode,
}: NodeDetailProps) {
  const [activeTab, setActiveTab] = useState<'stocks' | 'children'>(
    stocks.length > 0 ? 'stocks' : 'children'
  );
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [expandedPlain, setExpandedPlain] = useState(true);
  const [expandedStockId, setExpandedStockId] = useState<number | null>(null);

  const levelStyle = LEVEL_STYLES[nodeLevel] ?? LEVEL_STYLES.general;

  return (
    <div className="detail-panel w-64 h-full flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border-subtle">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border ${levelStyle.border} ${levelStyle.text} ${levelStyle.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
              {LEVEL_LABELS[nodeLevel] ?? nodeLevel}
            </span>
          </div>
          <h3 className="text-heading-md text-fg-primary mt-2">{nodeName}</h3>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {editMode && onDeleteNode && (
            <button
              onClick={() => {
                if (confirm('确定删除此节点及其所有子节点？')) {
                  onDeleteNode(nodeId);
                }
              }}
              className="p-1.5 rounded-md hover:bg-state-error/10 text-fg-tertiary hover:text-state-error transition-colors"
              title="删除节点"
            >
              <X size={14} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-canvas-overlay text-fg-tertiary hover:text-fg-primary transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 py-3 border-b border-border-subtle">
          <p
            className={[
              'text-[12px] text-fg-secondary leading-relaxed',
              expandedDesc ? '' : 'line-clamp-2',
            ].join(' ')}
          >
            {description}
          </p>
          {description.length > 40 && (
            <button
              onClick={() => setExpandedDesc(!expandedDesc)}
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors"
            >
              {expandedDesc ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expandedDesc ? '收起' : '展开全文'}
            </button>
          )}
        </div>
      )}

      {/* 大白话解读 */}
      {plainLanguageDescription && (
        <div className="px-4 py-3 border-b border-border-subtle bg-amber-500/[0.03]">
          <button
            onClick={() => setExpandedPlain(!expandedPlain)}
            className="flex items-center gap-1.5 text-[12px] font-medium text-amber-400/90 hover:text-amber-300 transition-colors mb-1.5"
          >
            <Lightbulb size={14} />
            <span>大白话解读</span>
            <ChevronRight
              size={12}
              className={['transition-transform', expandedPlain ? 'rotate-90' : ''].join(' ')}
            />
          </button>
          {expandedPlain && (
            <p className="text-[13px] text-amber-100/80 leading-relaxed pl-5">
              {plainLanguageDescription}
            </p>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border-subtle">
        {stocks.length > 0 && (
          <button
            onClick={() => setActiveTab('stocks')}
            className={[
              'flex-1 py-2.5 text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors',
              activeTab === 'stocks'
                ? 'text-fg-accent border-b-2 border-fg-accent'
                : 'text-fg-tertiary hover:text-fg-secondary',
            ].join(' ')}
          >
            <TrendingUp size={13} />
            关联股票
            <span className="count-badge">{stocks.length}</span>
          </button>
        )}
        {children.length > 0 && (
          <button
            onClick={() => setActiveTab('children')}
            className={[
              'flex-1 py-2.5 text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors',
              activeTab === 'children'
                ? 'text-fg-accent border-b-2 border-fg-accent'
                : 'text-fg-tertiary hover:text-fg-secondary',
            ].join(' ')}
          >
            <FolderOpen size={13} />
            细分节点
            <span className="count-badge">{children.length}</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {activeTab === 'stocks' && (
          <div className="space-y-1">
            {stocks.map(stock => {
              const isExpanded = expandedStockId === stock.id;
              return (
                <div key={stock.id} className="rounded-lg bg-canvas-surface/40 hover:bg-canvas-surface transition-colors overflow-hidden">
                  <button
                    onClick={() => setExpandedStockId(isExpanded ? null : stock.id)}
                    className="w-full flex items-center justify-between p-2.5 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-fg-primary truncate">
                        {stock.name}
                      </div>
                      <div className="text-[11px] text-fg-tertiary mt-0.5 tabular-nums">
                        {stock.code}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <div className="text-[10px] text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full max-w-[100px] truncate">
                        {stock.tag}
                      </div>
                      <ChevronRight
                        size={14}
                        className={[
                          'text-fg-tertiary transition-transform',
                          isExpanded ? 'rotate-90' : '',
                        ].join(' ')}
                      />
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-0">
                      <div className="text-[11px] text-fg-secondary leading-relaxed bg-canvas-base/60 rounded-lg p-3 border border-border-subtle">
                        {stock.description || stock.tag}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'children' && (
          <div className="space-y-1">
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => onDrillDown(child.id, child.name, child.level)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-canvas-surface/40 hover:bg-canvas-surface transition-colors text-left group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${LEVEL_STYLES[child.level]?.dot ?? 'bg-slate-400'}`}
                    />
                    <span className="text-[13px] font-medium text-fg-primary truncate group-hover:text-fg-accent transition-colors">
                      {child.name}
                    </span>
                  </div>
                  {child.description && (
                    <div className="text-[11px] text-fg-tertiary mt-0.5 truncate pl-3">
                      {child.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {child.stockCount > 0 && (
                    <span className="text-[10px] text-fg-tertiary bg-canvas-base px-1.5 py-0.5 rounded">
                      {child.stockCount}只
                    </span>
                  )}
                  <ChevronRight
                    size={14}
                    className="text-fg-tertiary group-hover:text-fg-accent transition-colors"
                  />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'stocks' && stocks.length === 0 && (
          <div className="text-center py-8 text-fg-disabled text-[12px]">暂无关联股票</div>
        )}
        {activeTab === 'children' && children.length === 0 && (
          <div className="text-center py-8 text-fg-disabled text-[12px]">暂无细分节点</div>
        )}
      </div>

      {/* Footer actions */}
      {(children.length > 0 || stocks.length > 0) && (
        <div className="p-3 border-t border-border-subtle">
          {children.length > 0 && (
            <button
              onClick={() => onDrillDown(nodeId, nodeName, nodeLevel)}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-canvas-surface hover:bg-canvas-overlay text-fg-accent text-[12px] font-medium transition-colors"
            >
              <ArrowRight size={13} />
              下钻查看全部子节点
            </button>
          )}
        </div>
      )}
    </div>
  );
}
