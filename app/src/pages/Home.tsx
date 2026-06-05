import { useState, useCallback, useMemo } from 'react';
import { Edit3, Check, Keyboard } from 'lucide-react';
import { TopNav } from '@/components/chain/TopNav';
import { Breadcrumb } from '@/components/chain/Breadcrumb';
import ChainGraph from '@/components/chain/ChainGraph';
import NodeDetail from '@/components/chain/NodeDetail';
import { CommandPalette, type SearchItem } from '@/components/chain/CommandPalette';
import { useShortcuts, createCanvasShortcuts } from '@/hooks/use-shortcuts';
import {
  semiconductorData,
  getNodesByParent,
  getNodePath,
  getNodeDetail,
  type IndustryData,
  type LocalNode,
} from '@/data/semiconductor';
import { powerData } from '@/data/power';
import { gridEquipmentData } from '@/data/gridEquipment';
import { metalData } from '@/data/metal';
import { aerospaceData } from '@/data/aerospace';
import { robotData } from '@/data/robot';
import { batteryData } from '@/data/battery';
import '../App.css';

// === 深拷贝工具 ===
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// === 初始化产业数据（可变的副本）===
function initIndustries(): IndustryData[] {
  return [deepClone(semiconductorData), deepClone(powerData), deepClone(gridEquipmentData), deepClone(metalData), deepClone(aerospaceData), deepClone(robotData), deepClone(batteryData)];
}

// === 跨产业查找节点 ===
function findNodeAcrossIndustries(industries: IndustryData[], nodeId: number): LocalNode | null {
  for (const ind of industries) {
    const node = ind.rootNodes.find(n => n.id === nodeId);
    if (node) return node;
    for (const children of Object.values(ind.childNodes)) {
      const child = children.find(n => n.id === nodeId);
      if (child) return child;
    }
  }
  return null;
}

export default function Home() {
  const [industries, setIndustries] = useState<IndustryData[]>(initIndustries);
  const [currentSlug, setCurrentSlug] = useState(industries[0].slug);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [addModal, setAddModal] = useState<{ open: boolean; parentId: number | null }>({
    open: false,
    parentId: null,
  });
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeLevel, setNewNodeLevel] = useState<'upstream' | 'midstream' | 'downstream' | 'general'>('general');
  const [searchOpen, setSearchOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // 当前产业数据
  const industry = useMemo(
    () => industries.find(i => i.slug === currentSlug) ?? industries[0],
    [industries, currentSlug]
  );

  // 当前层级的节点
  const currentNodes = useMemo(() => getNodesByParent(industry, currentParentId), [industry, currentParentId]);

  // 选中的节点详情
  const selectedDetail = useMemo(() => {
    if (!selectedNodeId) return null;
    return getNodeDetail(industry, selectedNodeId);
  }, [selectedNodeId, industry]);

  // 面包屑路径
  const breadcrumbPath = useMemo(() => {
    if (!currentParentId) return [];
    return getNodePath(industry, currentParentId);
  }, [currentParentId, industry]);

  // === 跨产业连接：收集当前视图中需要的所有节点 ===
  const currentNodeIds = useMemo(() => new Set(currentNodes.map(n => n.id)), [currentNodes]);

  // 找到所有与当前节点有连接的远端节点 ID
  const crossNodeIds = useMemo(() => {
    const ids = new Set<number>();
    industry.connections.forEach(c => {
      if (currentNodeIds.has(c.fromNodeId) && !currentNodeIds.has(c.toNodeId)) ids.add(c.toNodeId);
      if (currentNodeIds.has(c.toNodeId) && !currentNodeIds.has(c.fromNodeId)) ids.add(c.fromNodeId);
    });
    return ids;
  }, [industry, currentNodeIds]);

  // Graph 节点：当前视图节点 + 跨产业远端节点
  const graphNodes = useMemo(() => {
    const result = currentNodes.map(n => ({
      id: n.id,
      name: n.name,
      level: n.level,
      description: n.description ?? null,
      plainLanguageDescription: n.plainLanguageDescription ?? null,
      x: 0,
      y: 0,
      stockCount: n.stockCount ?? n.stocks?.length ?? 0,
      childCount: n.childCount ?? 0,
      isCrossIndustry: false,
    }));
    for (const id of crossNodeIds) {
      const node = findNodeAcrossIndustries(industries, id);
      if (node && !currentNodeIds.has(id)) {
        result.push({
          id: node.id,
          name: node.name,
          level: node.level,
          description: node.description ?? null,
          plainLanguageDescription: node.plainLanguageDescription ?? null,
          x: 0,
          y: 0,
          stockCount: node.stockCount ?? node.stocks?.length ?? 0,
          childCount: node.childCount ?? 0,
          isCrossIndustry: true,
        });
      }
    }
    return result;
  }, [currentNodes, crossNodeIds, industries, currentNodeIds]);

  // Graph 连接：显示所有至少一端在当前视图中的连接
  const graphConnections = useMemo(() => {
    const nodeIds = new Set(graphNodes.map(n => n.id));
    return industry.connections.filter(
      c => nodeIds.has(c.fromNodeId) && nodeIds.has(c.toNodeId)
    );
  }, [industry, graphNodes]);

  // Search items for Command Palette
  const searchItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];
    // Industries
    industries.forEach(ind => {
      items.push({
        id: `ind-${ind.slug}`,
        type: 'industry',
        name: ind.name,
        action: () => handleSelectIndustry(ind.slug),
      });
    });
    // Nodes (all levels)
    const allNodes: LocalNode[] = [];
    industries.forEach(ind => {
      allNodes.push(...ind.rootNodes);
      for (const children of Object.values(ind.childNodes)) {
        allNodes.push(...children);
      }
    });
    allNodes.forEach(n => {
      items.push({
        id: `node-${n.id}`,
        type: 'node',
        name: n.name,
        subtitle: n.description ?? undefined,
        meta: n.level,
        action: () => {
          // Find which industry this node belongs to
          const targetInd = industries.find(ind =>
            ind.rootNodes.some(r => r.id === n.id) ||
            Object.values(ind.childNodes).flat().some(c => c.id === n.id)
          );
          if (targetInd) {
            setCurrentSlug(targetInd.slug);
            const path = getNodePath(targetInd, n.id);
            if (path.length > 1) {
              setCurrentParentId(path[path.length - 2]?.id ?? null);
            } else {
              setCurrentParentId(null);
            }
            setSelectedNodeId(n.id);
          }
        },
      });
    });
    // Stocks
    for (const node of allNodes) {
      node.stocks?.forEach(s => {
        items.push({
          id: `stock-${s.id}`,
          type: 'stock',
          name: s.name,
          subtitle: s.code,
          action: () => {
            // Find which industry this stock's parent node belongs to
            const targetInd = industries.find(ind =>
              ind.rootNodes.some(r => r.id === node.id) ||
              Object.values(ind.childNodes).flat().some(c => c.id === node.id)
            );
            if (targetInd) {
              setCurrentSlug(targetInd.slug);
              const path = getNodePath(targetInd, node.id);
              if (path.length > 1) {
                setCurrentParentId(path[path.length - 2]?.id ?? null);
              } else {
                setCurrentParentId(null);
              }
              setSelectedNodeId(node.id);
            }
          },
        });
      });
    }
    return items;
  }, [industries]);

  // === 节点/连接增删 handlers ===
  const handleSelectIndustry = useCallback((slug: string) => {
    setCurrentSlug(slug);
    setCurrentParentId(null);
    setSelectedNodeId(null);
  }, []);

  const handleDrillDown = useCallback((nodeId: number, _nodeName?: string, _nodeLevel?: string) => {
    setCurrentParentId(nodeId);
    setSelectedNodeId(null);
  }, []);

  const handleBreadcrumbNavigate = useCallback((item: { id: number } | null) => {
    setSelectedNodeId(null);
    setCurrentParentId(item?.id ?? null);
  }, []);

  const handleAddNode = useCallback(
    (parentId: number | null) => {
      if (!editMode) return;
      setAddModal({ open: true, parentId });
      setNewNodeName('');
    },
    [editMode]
  );

  // 实际创建节点
  const handleCreateNode = useCallback(() => {
    const name = newNodeName.trim();
    if (!name) return;

    setIndustries(prev => {
      const next = deepClone(prev);
      const ind = next.find(i => i.slug === currentSlug);
      if (!ind) return prev;

      // 生成新 ID
      let maxId = 0;
      if (addModal.parentId === null) {
        ind.rootNodes.forEach(n => maxId = Math.max(maxId, n.id));
      } else {
        for (const children of Object.values(ind.childNodes)) {
          children.forEach(n => maxId = Math.max(maxId, n.id));
        }
        // 如果 childNodes[parentId] 不存在，maxId 可能为 0
        if (maxId === 0) {
          // 从父节点 ID 的基础上生成
          maxId = addModal.parentId! * 100;
        }
      }
      const newId = maxId + 1;

      const newNode: LocalNode = {
        id: newId,
        name,
        level: newNodeLevel,
        description: null,
        parentId: addModal.parentId,
        stockCount: 0,
        childCount: 0,
        stocks: [],
      };

      if (addModal.parentId === null) {
        ind.rootNodes.push(newNode);
      } else {
        if (!ind.childNodes[addModal.parentId]) {
          ind.childNodes[addModal.parentId] = [];
        }
        ind.childNodes[addModal.parentId].push(newNode);
        // 更新父节点的 childCount
        const parent = ind.rootNodes.find(n => n.id === addModal.parentId) ??
          Object.values(ind.childNodes).flat().find(n => n.id === addModal.parentId);
        if (parent) parent.childCount = ind.childNodes[addModal.parentId].length;
      }

      return next;
    });

    setAddModal({ open: false, parentId: null });
    setNewNodeName('');
  }, [newNodeName, newNodeLevel, addModal, currentSlug]);

  // 删除节点
  const handleDeleteNode = useCallback((id: number) => {
    setIndustries(prev => {
      const next = deepClone(prev);
      const ind = next.find(i => i.slug === currentSlug);
      if (!ind) return prev;

      // 删除根节点
      const rootIdx = ind.rootNodes.findIndex(n => n.id === id);
      if (rootIdx >= 0) {
        ind.rootNodes.splice(rootIdx, 1);
        // 删除相关子节点
        delete ind.childNodes[id];
        // 更新其他节点的 parentId（如果有指向该节点的）
        for (const children of Object.values(ind.childNodes)) {
          for (const c of children) {
            if (c.parentId === id) c.parentId = null;
          }
        }
        // 删除相关连接
        ind.connections = ind.connections.filter(c => c.fromNodeId !== id && c.toNodeId !== id);
        return next;
      }

      // 删除子节点
      for (const [pid, children] of Object.entries(ind.childNodes)) {
        const idx = children.findIndex(n => n.id === id);
        if (idx >= 0) {
          children.splice(idx, 1);
          // 更新父节点 childCount
          const parentId = Number(pid);
          const parent = ind.rootNodes.find(n => n.id === parentId) ??
            Object.values(ind.childNodes).flat().find(n => n.id === parentId);
          if (parent) parent.childCount = children.length;
          // 删除相关子节点的子节点
          delete ind.childNodes[id];
          // 删除相关连接
          ind.connections = ind.connections.filter(c => c.fromNodeId !== id && c.toNodeId !== id);
          return next;
        }
      }

      return prev;
    });
    if (selectedNodeId === id) setSelectedNodeId(null);
    if (currentParentId === id) setCurrentParentId(null);
  }, [currentSlug, selectedNodeId, currentParentId]);

  // 创建连接
  const handleCreateConnection = useCallback((fromNodeId: number, toNodeId: number) => {
    if (fromNodeId === toNodeId) return;
    setIndustries(prev => {
      const next = deepClone(prev);
      const ind = next.find(i => i.slug === currentSlug);
      if (!ind) return prev;

      // 检查是否已存在
      const exists = ind.connections.some(
        c => (c.fromNodeId === fromNodeId && c.toNodeId === toNodeId)
      );
      if (exists) return prev;

      const maxConnId = ind.connections.reduce((max, c) => Math.max(max, c.id), 0);
      ind.connections.push({
        id: maxConnId + 1,
        fromNodeId,
        toNodeId,
        label: null,
      });
      return next;
    });
  }, [currentSlug]);

  // 删除连接
  const handleDeleteConnection = useCallback((id: number) => {
    setIndustries(prev => {
      const next = deepClone(prev);
      const ind = next.find(i => i.slug === currentSlug);
      if (!ind) return prev;
      ind.connections = ind.connections.filter(c => c.id !== id);
      return next;
    });
  }, [currentSlug]);

  const handleGoBack = useCallback(() => {
    if (selectedNodeId) {
      setSelectedNodeId(null);
    } else if (currentParentId) {
      const path = getNodePath(industry, currentParentId);
      setCurrentParentId(path.length > 1 ? path[path.length - 2]?.id ?? null : null);
    }
  }, [selectedNodeId, currentParentId, industry]);

  // Keyboard shortcuts
  useShortcuts(
    createCanvasShortcuts({
      onSearch: () => setSearchOpen(true),
      onResetView: () => {}, // ChainGraph handles this internally
      onZoomIn: () => {},
      onZoomOut: () => {},
      onEscape: () => {
        if (addModal.open) {
          setAddModal({ open: false, parentId: null });
          return;
        }
        if (selectedNodeId) setSelectedNodeId(null);
        else if (currentParentId) handleGoBack();
      },
      onToggleEdit: () => setEditMode(prev => !prev),
      onDrillDown: () => {
        if (selectedNodeId && selectedDetail?.children?.length) {
          handleDrillDown(selectedNodeId);
        }
      },
      onGoBack: handleGoBack,
      onDelete: () => {
        // Only in edit mode
        if (editMode && selectedNodeId) {
          handleDeleteNode(selectedNodeId);
        }
      },
    }),
    true
  );

  // Extra shortcut for Command+K
  useShortcuts([
    {
      key: 'k',
      meta: true,
      handler: () => setSearchOpen(true),
      preventDefault: true,
    },
    {
      key: '?',
      shift: true,
      handler: () => setShowShortcuts(prev => !prev),
      preventDefault: true,
    },
  ]);

  return (
    <div className="h-screen flex flex-col bg-canvas-base overflow-hidden">
      <TopNav
        industries={industries}
        currentSlug={currentSlug}
        onSelect={handleSelectIndustry}
        onSearch={() => setSearchOpen(true)}
        editMode={editMode}
      />
      <Breadcrumb path={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="h-9 bg-canvas-elevated border-b border-border-subtle flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3 text-[11px] text-fg-tertiary">
              <span className="font-medium text-fg-secondary">{industry.name}</span>
              <span className="w-px h-3 bg-border-default" />
              <span>共 {graphNodes.filter(n => !n.isCrossIndustry).length} 个节点</span>
              {graphNodes.some(n => n.isCrossIndustry) && (
                <>
                  <span className="w-px h-3 bg-border-default" />
                  <span className="text-fg-accent">{graphNodes.filter(n => n.isCrossIndustry).length} 跨产业</span>
                </>
              )}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400/80 border border-amber-500/20">
                本地数据
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShortcuts(prev => !prev)}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-fg-tertiary hover:text-fg-secondary hover:bg-canvas-surface transition-colors"
                title="快捷键帮助 (Shift+?)"
              >
                <Keyboard size={12} />
                <span className="hidden sm:inline">快捷键</span>
              </button>
              <button
                onClick={() => setEditMode(!editMode)}
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

          <ChainGraph
            nodes={graphNodes}
            connections={graphConnections}
            selectedId={selectedNodeId}
            onSelect={setSelectedNodeId}
            onDrillDown={handleDrillDown}
            editMode={editMode}
            onAddNode={handleAddNode}
            onDeleteNode={handleDeleteNode}
            onAddConnection={handleCreateConnection}
            onDeleteConnection={handleDeleteConnection}
            cacheSlug={industry.slug}
            parentId={currentParentId}
          />
        </div>

        {selectedNodeId && selectedDetail && (
          <div className="animate-slide-in-right">
            <NodeDetail
              nodeId={selectedNodeId}
              nodeName={selectedDetail.name}
              nodeLevel={selectedDetail.level}
              description={selectedDetail.description ?? null}
              plainLanguageDescription={selectedDetail.plainLanguageDescription ?? null}
              stocks={selectedDetail.stocks ?? []}
              children={(selectedDetail.children ?? []).map((c: any) => ({
                id: c.id,
                name: c.name,
                level: c.level,
                description: c.description ?? null,
                stockCount: c.stockCount ?? c.stocks?.length ?? 0,
              }))}
              onClose={() => setSelectedNodeId(null)}
              onDrillDown={handleDrillDown}
              editMode={editMode}
            />
          </div>
        )}
      </div>

      {/* Edit Mode Indicator */}
      {editMode && (
        <div className="edit-indicator">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          编辑模式开启 — 右键添加/删除节点 · 拖拽移动节点 · 拖动锚点创建连线 · 点击连线删除
        </div>
      )}

      {/* Add Node Modal */}
      {addModal.open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[2000] animate-fade-in">
          <div className="glass-panel rounded-xl p-5 w-80 animate-slide-in-right">
            <h3 className="text-sm font-semibold text-fg-primary mb-3">
              {addModal.parentId ? '添加子节点' : '添加根节点'}
            </h3>
            <input
              type="text"
              value={newNodeName}
              onChange={e => setNewNodeName(e.target.value)}
              placeholder="节点名称"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') handleCreateNode();
                if (e.key === 'Escape') {
                  setAddModal({ open: false, parentId: null });
                  setNewNodeName('');
                }
              }}
              className="w-full bg-canvas-base border border-border-default rounded-lg px-3 py-2 text-sm text-fg-primary placeholder-fg-disabled focus:outline-none focus:border-fg-accent/50 mb-3 transition-colors"
            />
            <select
              value={newNodeLevel}
              onChange={e => setNewNodeLevel(e.target.value as any)}
              className="w-full bg-canvas-base border border-border-default rounded-lg px-3 py-2 text-sm text-fg-primary mb-4 focus:outline-none focus:border-fg-accent/50"
            >
              <option value="upstream">上游</option>
              <option value="midstream">中游</option>
              <option value="downstream">下游</option>
              <option value="general">通用</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setAddModal({ open: false, parentId: null });
                  setNewNodeName('');
                }}
                className="px-3 py-1.5 rounded-lg text-xs text-fg-tertiary hover:bg-canvas-surface transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreateNode}
                disabled={!newNodeName.trim()}
                className="px-3 py-1.5 rounded-lg text-xs bg-fg-accent text-canvas-base font-medium hover:bg-sky-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Command Palette */}
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} items={searchItems} />

      {/* Shortcuts Help */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-[2500] flex items-center justify-center"
          onClick={() => setShowShortcuts(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative glass-panel rounded-xl p-6 w-full max-w-sm animate-slide-in-right">
            <h3 className="text-heading-md text-fg-primary mb-4">键盘快捷键</h3>
            <div className="space-y-2">
              {[
                { keys: 'Ctrl + F / ⌘ + K', desc: '搜索' },
                { keys: 'Space', desc: '按住拖拽平移' },
                { keys: 'Enter', desc: '下钻选中节点' },
                { keys: 'Backspace', desc: '返回上一级' },
                { keys: 'Esc', desc: '取消选择 / 关闭' },
                { keys: 'E', desc: '切换编辑模式' },
                { keys: 'Ctrl + 0', desc: '重置视图' },
                { keys: 'Ctrl + +/-', desc: '放大 / 缩小' },
                { keys: 'Shift + ?', desc: '显示快捷键帮助' },
              ].map(item => (
                <div key={item.desc} className="flex items-center justify-between text-[12px]">
                  <span className="text-fg-secondary">{item.desc}</span>
                  <kbd className="px-2 py-0.5 rounded bg-canvas-surface border border-border-default text-fg-tertiary font-mono text-[11px]">
                    {item.keys}
                  </kbd>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowShortcuts(false)}
              className="mt-4 w-full py-2 rounded-lg bg-canvas-surface hover:bg-canvas-overlay text-fg-secondary text-[12px] transition-colors"
            >
              关闭 (Esc)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
