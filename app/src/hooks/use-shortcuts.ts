import { useEffect, useRef, useCallback } from 'react';

export interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: (e: KeyboardEvent) => void;
  preventDefault?: boolean;
  description?: string;
}

export function useShortcuts(shortcuts: ShortcutConfig[], enabled = true) {
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;

    // 忽略输入框内的快捷键（除 Escape 和 Ctrl+F）
    const target = e.target as HTMLElement;
    const isInput =
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable;

    for (const sc of shortcutsRef.current) {
      const keyMatch =
        e.key.toLowerCase() === sc.key.toLowerCase() ||
        e.code === sc.key;

      const modMatch =
        !!sc.ctrl === e.ctrlKey &&
        !!sc.shift === e.shiftKey &&
        !!sc.alt === e.altKey &&
        !!sc.meta === e.metaKey;

      if (keyMatch && modMatch) {
        if (isInput && sc.key !== 'Escape' && !(sc.ctrl && sc.key === 'f')) {
          continue;
        }
        if (sc.preventDefault !== false) {
          e.preventDefault();
        }
        sc.handler(e);
        return;
      }
    }
  }, [enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// 预定义的常用快捷键模板
export const createCanvasShortcuts = (
  actions: {
    onSearch?: () => void;
    onResetView?: () => void;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onEscape?: () => void;
    onToggleEdit?: () => void;
    onDrillDown?: () => void;
    onGoBack?: () => void;
    onDelete?: () => void;
  }
): ShortcutConfig[] => [
  {
    key: 'f',
    ctrl: true,
    handler: () => actions.onSearch?.(),
    description: '搜索',
  },
  {
    key: '0',
    ctrl: true,
    handler: () => actions.onResetView?.(),
    description: '重置视图',
  },
  {
    key: '=',
    ctrl: true,
    handler: () => actions.onZoomIn?.(),
    description: '放大',
  },
  {
    key: '-',
    ctrl: true,
    handler: () => actions.onZoomOut?.(),
    description: '缩小',
  },
  {
    key: 'Escape',
    handler: () => actions.onEscape?.(),
    description: '取消选择/关闭',
  },
  {
    key: 'e',
    handler: () => actions.onToggleEdit?.(),
    description: '切换编辑模式',
  },
  {
    key: 'Enter',
    handler: () => actions.onDrillDown?.(),
    description: '下钻',
  },
  {
    key: 'Backspace',
    handler: () => actions.onGoBack?.(),
    description: '返回上一级',
  },
  {
    key: 'Delete',
    handler: () => actions.onDelete?.(),
    description: '删除选中节点',
  },
];
