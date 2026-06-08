import { useState } from 'react';
import { TopNav } from '@/components/chain/TopNav';
import { Breadcrumb } from '@/components/chain/Breadcrumb';
import ChainGraph from '@/components/chain/ChainGraph';
import NodeDetail from '@/components/chain/NodeDetail';
import { CommandPalette } from '@/components/chain/CommandPalette';
import { Toolbar } from '@/components/chain/Toolbar';
import { AddNodeModal } from '@/components/chain/AddNodeModal';
import { useIndustryData } from '@/hooks/use-industry-data';
import { useSearchItems } from '@/hooks/use-search-items';
import { useShortcuts, createCanvasShortcuts } from '@/hooks/use-shortcuts';
import '../App.css';

export default function Home() {
  const {
    // State
    industries,
    currentSlug,
    currentParentId,
    selectedNodeId,
    editMode,
    addModal,
    // Derived
    industry,
    selectedDetail,
    breadcrumbPath,
    graphNodes,
    graphConnections,
    // Actions
    selectIndustry,
    setCurrentSlug,
    setCurrentParentId,
    drillDown,
    breadcrumbNavigate,
    goBack,
    setSelectedNodeId,
    toggleEdit,
    openAddModal,
    closeAddModal,
    createNode,
    deleteNode,
    createConnection,
    deleteConnection,
  } = useIndustryData();

  const [searchOpen, setSearchOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const searchItems = useSearchItems({
    industries,
    setCurrentSlug,
    setCurrentParentId,
    setSelectedNodeId,
  });

  // Keyboard shortcuts
  useShortcuts(
    createCanvasShortcuts({
      onSearch: () => setSearchOpen(true),
      onResetView: () => {},
      onZoomIn: () => {},
      onZoomOut: () => {},
      onEscape: () => {
        if (addModal.open) {
          closeAddModal();
          return;
        }
        if (selectedNodeId) setSelectedNodeId(null);
        else if (currentParentId) goBack();
      },
      onToggleEdit: toggleEdit,
      onDrillDown: () => {
        if (selectedNodeId && selectedDetail?.children?.length) {
          drillDown(selectedNodeId);
        }
      },
      onGoBack: goBack,
      onDelete: () => {
        if (editMode && selectedNodeId) {
          deleteNode(selectedNodeId);
        }
      },
    }),
    true,
  );

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
        onSelect={selectIndustry}
        onSearch={() => setSearchOpen(true)}
        editMode={editMode}
      />
      <Breadcrumb path={breadcrumbPath} onNavigate={breadcrumbNavigate} />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Toolbar
            industryName={industry.name}
            localNodeCount={graphNodes.filter(n => !n.isCrossIndustry).length}
            crossNodeCount={graphNodes.filter(n => n.isCrossIndustry).length}
            editMode={editMode}
            onToggleEdit={toggleEdit}
            onShowShortcuts={() => setShowShortcuts(prev => !prev)}
          />

          <ChainGraph
            nodes={graphNodes}
            connections={graphConnections}
            selectedId={selectedNodeId}
            onSelect={setSelectedNodeId}
            onDrillDown={drillDown}
            editMode={editMode}
            onAddNode={openAddModal}
            onDeleteNode={deleteNode}
            onAddConnection={createConnection}
            onDeleteConnection={deleteConnection}
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
              onDrillDown={drillDown}
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
      <AddNodeModal
        open={addModal.open}
        parentId={addModal.parentId}
        onCreate={createNode}
        onClose={closeAddModal}
      />

      {/* Command Palette */}
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={searchItems}
      />

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
