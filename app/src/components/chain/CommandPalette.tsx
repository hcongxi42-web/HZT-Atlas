import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, X, Cpu, TrendingUp, FolderOpen, ArrowRight } from 'lucide-react';

export interface SearchItem {
  id: string;
  type: 'industry' | 'node' | 'stock';
  name: string;
  subtitle?: string;
  meta?: string;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: SearchItem[];
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  industry: <Cpu size={14} className="text-fg-accent" />,
  node: <FolderOpen size={14} className="text-blue-400" />,
  stock: <TrendingUp size={14} className="text-emerald-400" />,
};

const TYPE_LABELS: Record<string, string> = {
  industry: '产业',
  node: '节点',
  stock: '股票',
};

function fuzzyMatch(query: string, text: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return items.slice(0, 12);
    return items.filter(
      item =>
        fuzzyMatch(query, item.name) ||
        fuzzyMatch(query, item.subtitle ?? '') ||
        fuzzyMatch(query, item.meta ?? '')
    ).slice(0, 12);
  }, [query, items]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) {
          item.action();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selectedIndex, onClose]);

  // 滚动选中项到视图
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleSelect = useCallback((item: SearchItem) => {
    item.action();
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg glass-panel rounded-xl shadow-canvas-xl overflow-hidden animate-slide-in-right"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
          <Search size={18} className="text-fg-tertiary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索节点、股票、产业..."
            className="flex-1 bg-transparent text-[14px] text-fg-primary placeholder:text-fg-disabled outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-canvas-overlay text-fg-tertiary hover:text-fg-primary transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-fg-disabled text-[13px]">
              未找到匹配结果
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => handleSelect(item)}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                    isSelected ? 'bg-canvas-overlay' : 'hover:bg-canvas-surface/50',
                  ].join(' ')}
                >
                  <span className="shrink-0">{TYPE_ICONS[item.type]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-fg-primary truncate">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-canvas-surface text-fg-tertiary">
                        {TYPE_LABELS[item.type]}
                      </span>
                    </div>
                    {item.subtitle && (
                      <div className="text-[11px] text-fg-tertiary truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  {isSelected && <ArrowRight size={14} className="shrink-0 text-fg-accent" />}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border-subtle flex items-center justify-between text-[10px] text-fg-disabled">
          <span>{filtered.length} 个结果</span>
          <div className="flex items-center gap-3">
            <span>↑↓ 选择</span>
            <span>↵ 确认</span>
            <span>Esc 关闭</span>
          </div>
        </div>
      </div>
    </div>
  );
}
