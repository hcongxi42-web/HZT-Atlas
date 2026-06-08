import { useState, useEffect } from 'react';

interface AddNodeModalProps {
  open: boolean;
  parentId: number | null;
  onCreate: (name: string, level: 'upstream' | 'midstream' | 'downstream' | 'general') => void;
  onClose: () => void;
}

export function AddNodeModal({ open, parentId, onCreate, onClose }: AddNodeModalProps) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<'upstream' | 'midstream' | 'downstream' | 'general'>('general');

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setName('');
      setLevel('general');
    }
  }, [open]);

  if (!open) return null;

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate(trimmed, level);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[2000] animate-fade-in">
      <div className="glass-panel rounded-xl p-5 w-80 animate-slide-in-right">
        <h3 className="text-sm font-semibold text-fg-primary mb-3">
          {parentId ? '添加子节点' : '添加根节点'}
        </h3>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="节点名称"
          autoFocus
          onKeyDown={e => {
            if (e.key === 'Enter') handleCreate();
            if (e.key === 'Escape') onClose();
          }}
          className="w-full bg-canvas-base border border-border-default rounded-lg px-3 py-2 text-sm text-fg-primary placeholder-fg-disabled focus:outline-none focus:border-fg-accent/50 mb-3 transition-colors"
        />
        <select
          value={level}
          onChange={e => setLevel(e.target.value as typeof level)}
          className="w-full bg-canvas-base border border-border-default rounded-lg px-3 py-2 text-sm text-fg-primary mb-4 focus:outline-none focus:border-fg-accent/50"
        >
          <option value="upstream">上游</option>
          <option value="midstream">中游</option>
          <option value="downstream">下游</option>
          <option value="general">通用</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs text-fg-tertiary hover:bg-canvas-surface transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="px-3 py-1.5 rounded-lg text-xs bg-fg-accent text-canvas-base font-medium hover:bg-sky-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            创建
          </button>
        </div>
      </div>
    </div>
  );
}
