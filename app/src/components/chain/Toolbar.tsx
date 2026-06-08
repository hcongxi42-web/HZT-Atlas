import { Edit3, Check, Keyboard } from 'lucide-react';

interface ToolbarProps {
  industryName: string;
  localNodeCount: number;
  crossNodeCount: number;
  editMode: boolean;
  onToggleEdit: () => void;
  onShowShortcuts: () => void;
}

export function Toolbar({
  industryName,
  localNodeCount,
  crossNodeCount,
  editMode,
  onToggleEdit,
  onShowShortcuts,
}: ToolbarProps) {
  return (
    <div className="h-9 bg-canvas-elevated border-b border-border-subtle flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3 text-[11px] text-fg-tertiary">
        <span className="font-medium text-fg-secondary">{industryName}</span>
        <span className="w-px h-3 bg-border-default" />
        <span>共 {localNodeCount} 个节点</span>
        {crossNodeCount > 0 && (
          <>
            <span className="w-px h-3 bg-border-default" />
            <span className="text-fg-accent">{crossNodeCount} 跨产业</span>
          </>
        )}
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400/80 border border-amber-500/20">
          本地数据
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onShowShortcuts}
          className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-fg-tertiary hover:text-fg-secondary hover:bg-canvas-surface transition-colors"
          title="快捷键帮助 (Shift+?)"
        >
          <Keyboard size={12} />
          <span className="hidden sm:inline">快捷键</span>
        </button>
        <button
          onClick={onToggleEdit}
          className={[
            'flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all border',
            editMode
              ? 'bg-state-error/10 text-state-error border-state-error/20'
              : 'bg-canvas-surface text-fg-tertiary hover:text-fg-secondary border-border-default',
          ].join(' ')}
        >
          {editMode ? (
            <>
              <Check size={12} /> 完成编辑
            </>
          ) : (
            <>
              <Edit3 size={12} /> 编辑模式
            </>
          )}
        </button>
      </div>
    </div>
  );
}
