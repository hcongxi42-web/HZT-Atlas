import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Maximize2, Plus, Minus, Link2 } from 'lucide-react';
import { ChainNode, type ChainNodeData } from './ChainNode';

import { Minimap } from './Minimap';
import { useCanvasTransform } from '@/hooks/use-canvas-transform';

interface GraphConnection {
  id: number;
  fromNodeId: number;
  toNodeId: number;
  label: string | null;
}

interface ChainGraphProps {
  nodes: ChainNodeData[];
  connections: GraphConnection[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  onDrillDown: (id: number, name: string, level: string) => void;
  editMode: boolean;
  onAddNode?: (parentId: number | null) => void;
  onDeleteNode?: (id: number) => void;
  onAddConnection?: (fromNodeId: number, toNodeId: number) => void;
  onDeleteConnection?: (id: number) => void;
  cacheSlug?: string;
  parentId?: number | null;
}

const NODE_W = 152;
const NODE_H = 70;
const TOP_PAD = 120;
const LEVEL_GAP = 160;

// ---- Cache ----
function cacheKey(slug: string, parentId: number | null) {
  return `chain-pos-v2-${slug}-${parentId ?? 'root'}`;
}

function loadPositions(
  slug: string,
  parentId: number | null,
  expectedIds: Set<number>
): Map<number, { x: number; y: number }> | null {
  try {
    const raw = localStorage.getItem(cacheKey(slug, parentId));
    if (!raw) return null;
    const data = JSON.parse(raw) as Record<string, { x: number; y: number }>;
    const map = new Map<number, { x: number; y: number }>();
    for (const [k, v] of Object.entries(data)) {
      const id = Number(k);
      if (expectedIds.has(id)) map.set(id, v);
    }
    return map.size > 0 ? map : null;
  } catch {
    return null;
  }
}

function savePositions(slug: string, parentId: number | null, positions: Map<number, { x: number; y: number }>) {
  try {
    const data: Record<string, { x: number; y: number }> = {};
    positions.forEach((v, k) => {
      data[String(k)] = v;
    });
    localStorage.setItem(cacheKey(slug, parentId), JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

// ---- Layout ----
function layoutHierarchy(nodes: ChainNodeData[], width: number) {
  if (nodes.length === 0) return;
  const groups: Record<string, ChainNodeData[]> = {};
  nodes.forEach(n => {
    if (!groups[n.level]) groups[n.level] = [];
    groups[n.level].push(n);
  });
  const order = ['upstream', 'midstream', 'downstream', 'general'];
  const levels = order.filter(l => groups[l]?.length > 0);
  const usable = Math.max(width - 240, 300);
  const startX = 120;
  levels.forEach((level, li) => {
    const g = groups[level];
    const spacing = usable / (g.length + 1);
    g.forEach((n, i) => {
      n.x = startX + spacing * (i + 1) - NODE_W / 2;
      n.y = TOP_PAD + li * LEVEL_GAP;
    });
  });
}

// ---- Anchors ----
type Anchor = { x: number; y: number; side: 'top' | 'bottom' | 'left' | 'right' };

function getAnchors(nx: number, ny: number): Anchor[] {
  const cx = nx + NODE_W / 2,
    cy = ny + NODE_H / 2;
  return [
    { x: cx, y: ny, side: 'top' },
    { x: cx, y: ny + NODE_H, side: 'bottom' },
    { x: nx, y: cy, side: 'left' },
    { x: nx + NODE_W, y: cy, side: 'right' },
  ];
}

function findBestAnchors(fx: number, fy: number, tx: number, ty: number): [Anchor, Anchor] {
  const fa = getAnchors(fx, fy),
    ta = getAnchors(tx, ty);
  let best = Infinity,
    pair: [Anchor, Anchor] = [fa[0], ta[0]];
  for (const f of fa)
    for (const t of ta) {
      const d = (f.x - t.x) ** 2 + (f.y - t.y) ** 2;
      if (d < best) {
        best = d;
        pair = [f, t];
      }
    }
  return pair;
}

function bezierPath(a1: Anchor, a2: Anchor): string {
  const dx = Math.abs(a2.x - a1.x),
    dy = Math.abs(a2.y - a1.y);
  const off = Math.max(dx, dy) * 0.5 + 40;
  let c1x = a1.x,
    c1y = a1.y,
    c2x = a2.x,
    c2y = a2.y;
  if (a1.side === 'top') c1y -= off;
  else if (a1.side === 'bottom') c1y += off;
  else if (a1.side === 'left') c1x -= off;
  else c1x += off;
  if (a2.side === 'top') c2y -= off;
  else if (a2.side === 'bottom') c2y += off;
  else if (a2.side === 'left') c2x -= off;
  else c2x += off;
  return `M ${a1.x.toFixed(1)} ${a1.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${a2.x.toFixed(1)} ${a2.y.toFixed(1)}`;
}

export default function ChainGraph({
  nodes,
  connections,
  selectedId,
  onSelect,
  onDrillDown,
  editMode,
  onAddNode,
  onDeleteNode,
  onAddConnection,
  onDeleteConnection,
  cacheSlug = 'default',
  parentId = null,
}: ChainGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const positionsRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const rafRef = useRef<number>(0);
  const needsRedrawRef = useRef(true);
  const prevKeyRef = useRef<string>('');

  const {
    transform,
    isPanning,
    // zoomIn, zoomOut, resetView — available if needed
    navigateTo,
    fitView,
    onWheel,
    onPanStart,
    onPanMove,
    onPanEnd,
    screenToWorld,
  } = useCanvasTransform({ containerRef, minScale: 0.3, maxScale: 2, zoomStep: 0.12 });

  // World bounds for minimap & fitView — must be declared before any hook that references it
  const worldBounds = useMemo(() => {
    if (nodes.length === 0) return { minX: 0, minY: 0, maxX: 800, maxY: 600 };
    const xs = nodes.map(n => n.x);
    const ys = nodes.map(n => n.y);
    return {
      minX: Math.min(...xs) - 100,
      minY: Math.min(...ys) - 100,
      maxX: Math.max(...xs) + NODE_W + 100,
      maxY: Math.max(...ys) + NODE_H + 100,
    };
  }, [nodes]);

  const viewRect = useMemo(() => {
    const c = containerRef.current;
    if (!c) return { x: 0, y: 0, width: 800, height: 600 };
    const w = c.clientWidth / transform.scale;
    const h = c.clientHeight / transform.scale;
    const x = -transform.x / transform.scale;
    const y = -transform.y / transform.scale;
    return { x, y, width: w, height: h };
  }, [transform]);

  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; nodeId: number | null; connId: number | null } | null>(null);


  const skipClick = useRef(false);
  const dragRef = useRef<{ nodeId: number; startX: number; startY: number; ox: number; oy: number } | null>(null);
  const hasMoved = useRef(false);

  // 手动连线绘制状态（从锚点拖动）
  const [drawingConn, setDrawingConn] = useState<{
    fromNodeId: number;
    fromSide: 'top' | 'bottom' | 'left' | 'right';
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
  } | null>(null);

  // 绘制相关的 ref（避免 useEffect 频繁重新订阅）
  const isDrawingRef = useRef(false);
  const drawingFromRef = useRef<{ nodeId: number; side: string } | null>(null);
  const drawConnRef = useRef(drawingConn);
  drawConnRef.current = drawingConn;
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;
  const onAddConnectionRef = useRef(onAddConnection);
  onAddConnectionRef.current = onAddConnection;
  const screenToWorldRef = useRef(screenToWorld);
  screenToWorldRef.current = screenToWorld;

  // Init positions
  useEffect(() => {
    const c = containerRef.current;
    if (!c || nodes.length === 0) return;
    const w = c.clientWidth;
    const key = `${cacheSlug}-${parentId ?? 'root'}`;
    const sameView = prevKeyRef.current === key;
    prevKeyRef.current = key;

    const ids = new Set(nodes.map(n => n.id));
    const cached = loadPositions(cacheSlug, parentId, ids);

    if (cached && sameView) {
      // 有缓存且在同一视图：保留已有节点位置，只给新节点分配位置
      positionsRef.current = new Map(cached);
      nodes.forEach(n => {
        const p = cached.get(n.id);
        if (p) {
          n.x = p.x;
          n.y = p.y;
        }
      });

      // 新节点默认放在已有节点右下方
      const newNodes = nodes.filter(n => !cached.has(n.id));
      if (newNodes.length > 0) {
        const cachedPositions = Array.from(cached.values());
        const minX = Math.min(...cachedPositions.map(p => p.x), 100);
        const maxY = Math.max(...cachedPositions.map(p => p.y + NODE_H), TOP_PAD);
        newNodes.forEach((n, i) => {
          n.x = minX + (i % 4) * (NODE_W + 60);
          n.y = maxY + 80 + Math.floor(i / 4) * (NODE_H + 50);
          positionsRef.current.set(n.id, { x: n.x, y: n.y });
        });
      }
    } else if (cached) {
      // 有缓存但视图变了：恢复所有能匹配的位置
      positionsRef.current = new Map(cached);
      nodes.forEach(n => {
        const p = cached.get(n.id);
        if (p) {
          n.x = p.x;
          n.y = p.y;
        }
      });
      // 新节点布局
      const newNodes = nodes.filter(n => !cached.has(n.id));
      if (newNodes.length > 0) {
        layoutHierarchy(newNodes, w);
        newNodes.forEach(n => positionsRef.current.set(n.id, { x: n.x, y: n.y }));
      }
    } else {
      layoutHierarchy(nodes, w);
      const map = new Map<number, { x: number; y: number }>();
      nodes.forEach(n => map.set(n.id, { x: n.x, y: n.y }));
      positionsRef.current = map;
    }

    requestAnimationFrame(() => {
      nodeRefs.current.forEach((el, id) => {
        const p = positionsRef.current.get(id);
        if (p) el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      });
    });
    needsRedrawRef.current = true;
  }, [nodes, cacheSlug, parentId]);

  // RAF loop for SVG edges
  useEffect(() => {
    const draw = () => {
      if (needsRedrawRef.current) {
        needsRedrawRef.current = false;
        const svg = svgRef.current;
        if (!svg) return;
        const pos = positionsRef.current;
        const selectedSet = new Set<number>();
        if (selectedId !== null) {
          selectedSet.add(selectedId);
          connections.forEach(c => {
            if (c.fromNodeId === selectedId) selectedSet.add(c.toNodeId);
            if (c.toNodeId === selectedId) selectedSet.add(c.fromNodeId);
          });
        }

        let html = '';
        // 流动动画定义
        html += `<defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#475569" />
          </marker>
        </defs>`;

        connections.forEach(conn => {
          const f = pos.get(conn.fromNodeId),
            t = pos.get(conn.toNodeId);
          if (!f || !t) return;
          const [a1, a2] = findBestAnchors(f.x, f.y, t.x, t.y);
          const path = bezierPath(a1, a2);
          const mx = (a1.x + a2.x) / 2,
            my = (a1.y + a2.y) / 2;

          const isRelated = selectedId !== null && (conn.fromNodeId === selectedId || conn.toNodeId === selectedId);
          const isDimmed = selectedId !== null && !isRelated;
          const isCross = nodes.find(n => n.id === conn.fromNodeId)?.isCrossIndustry || nodes.find(n => n.id === conn.toNodeId)?.isCrossIndustry;

          const stroke = isRelated ? '#38bdf8' : (isCross ? '#a78bfa' : '#475569');
          const strokeWidth = isRelated ? 2 : 1.5;
          const opacity = isDimmed ? 0.15 : (isCross ? 0.6 : 1);
          const dash = isCross ? 'stroke-dasharray="6,4"' : (isRelated ? '' : 'stroke-dasharray="4,4"');
          const glow = isRelated ? 'filter="drop-shadow(0 0 3px rgba(56,189,248,0.4))"' : '';

          // 连接线点击区域（更宽的透明路径用于交互，必须设置 pointer-events="all" 否则透明 stroke 不接收事件）
          html += `<path d="${path}" fill="none" stroke="rgba(0,0,0,0)" stroke-width="14" data-conn-id="${conn.id}" pointer-events="all" style="cursor: pointer" />`;
          html += `<path d="${path}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" ${dash} opacity="${opacity}" ${glow} style="pointer-events: none" />`;

          if (conn.label) {
            html += `<text x="${mx}" y="${my - 6}" fill="${isCross ? '#a78bfa' : '#64748b'}" font-size="9" text-anchor="middle" opacity="${opacity}">${conn.label}</text>`;
          }
        });

        // 绘制手动连线预览
        const dc = drawConnRef.current;
        if (dc) {
          const fromAnchor: Anchor = { x: dc.fromX, y: dc.fromY, side: dc.fromSide };
          const toAnchor: Anchor = { x: dc.toX, y: dc.toY, side: 'top' };
          const path = bezierPath(fromAnchor, toAnchor);
          html += `<path d="${path}" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6,4" opacity="0.8" />`;
          html += `<circle cx="${dc.toX}" cy="${dc.toY}" r="5" fill="#38bdf8" opacity="0.6" />`;
          // 绘制起点锚点高亮
          html += `<circle cx="${dc.fromX}" cy="${dc.fromY}" r="5" fill="#38bdf8" opacity="0.8" />`;
        }

        svg.innerHTML = html;
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [connections, nodes, selectedId]);

  useEffect(() => {
    needsRedrawRef.current = true;
  }, [transform]);

  useEffect(() => {
    needsRedrawRef.current = true;
  }, [drawingConn]);

  // 手动连线：一次性全局事件监听（通过 ref 访问最新状态，避免频繁重新订阅）
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      const world = screenToWorldRef.current(e.clientX, e.clientY);
      setDrawingConn(prev => prev ? { ...prev, toX: world.x, toY: world.y } : null);
    };

    const findNearestAnchor = (wx: number, wy: number): { nodeId: number; side: string } | null => {
      let best: { nodeId: number; side: string; dist: number } | null = null;
      for (const node of nodesRef.current) {
        if (node.id === drawingFromRef.current?.nodeId) continue;
        const p = positionsRef.current.get(node.id);
        if (!p) continue;
        const anchors = getAnchors(p.x, p.y);
        for (const a of anchors) {
          const dist = Math.hypot(a.x - wx, a.y - wy);
          if (dist < 24 && (!best || dist < best.dist)) {
            best = { nodeId: node.id, side: a.side, dist };
          }
        }
      }
      return best ? { nodeId: best.nodeId, side: best.side } : null;
    };

    const onUp = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;

      const world = screenToWorldRef.current(e.clientX, e.clientY);
      const target = findNearestAnchor(world.x, world.y);
      if (target && drawingFromRef.current) {
        onAddConnectionRef.current?.(drawingFromRef.current.nodeId, target.nodeId);
      }
      // 防止绘制后触发节点点击
      skipClick.current = true;
      setTimeout(() => { skipClick.current = false; }, 100);
      setDrawingConn(null);
      drawingFromRef.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []); // 空依赖，只添加一次

  // Drag & Pan
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragRef.current) {
        const d = dragRef.current;
        const dx = (e.clientX - d.startX) / transform.scale;
        const dy = (e.clientY - d.startY) / transform.scale;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved.current = true;
        const nx = d.ox + dx,
          ny = d.oy + dy;
        // 网格吸附
        const snap = 8;
        const snapX = Math.round(nx / snap) * snap;
        const snapY = Math.round(ny / snap) * snap;
        positionsRef.current.set(d.nodeId, { x: snapX, y: snapY });
        const el = nodeRefs.current.get(d.nodeId);
        if (el) el.style.transform = `translate(${snapX}px, ${snapY}px)`;
        needsRedrawRef.current = true;
      }
      if (isPanning) {
        onPanMove(e as unknown as React.MouseEvent);
      }
    };
    const onUp = () => {
      if (dragRef.current && hasMoved.current) {
        savePositions(cacheSlug, parentId, positionsRef.current);
        skipClick.current = true;
        setTimeout(() => {
          skipClick.current = false;
        }, 100);
      }
      dragRef.current = null;
      onPanEnd();
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [transform.scale, isPanning, onPanMove, onPanEnd, cacheSlug, parentId]);

  const onNodeMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: number) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      const p = positionsRef.current.get(nodeId);
      if (!p) return;

      hasMoved.current = false;
      dragRef.current = { nodeId, startX: e.clientX, startY: e.clientY, ox: p.x, oy: p.y };
    },
    []
  );

  // 锚点按下：开始手动连线
  const onAnchorMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: number, side: 'top' | 'bottom' | 'left' | 'right') => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const p = positionsRef.current.get(nodeId);
      if (!p) return;

      const anchors = getAnchors(p.x, p.y);
      const anchor = anchors.find(a => a.side === side);
      if (!anchor) return;

      skipClick.current = true;
      setTimeout(() => { skipClick.current = false; }, 200);
      isDrawingRef.current = true;
      drawingFromRef.current = { nodeId, side };
      setDrawingConn({
        fromNodeId: nodeId,
        fromSide: side,
        fromX: anchor.x,
        fromY: anchor.y,
        toX: anchor.x,
        toY: anchor.y,
      });
    },
    []
  );

  const onNodeClick = useCallback(
    (node: ChainNodeData) => {
      if (skipClick.current) return;
      if (node.isCrossIndustry) {
        // 跨产业节点：只选中，不下钻
        onSelect(selectedId === node.id ? null : node.id);
        return;
      }
      onSelect(selectedId === node.id ? null : node.id);
    },
    [selectedId, onSelect]
  );

  const onNodeDoubleClick = useCallback(
    (node: ChainNodeData) => {
      if (node.isCrossIndustry) return;
      if (node.childCount > 0) {
        onDrillDown(node.id, node.name, node.level);
      }
    },
    [onDrillDown]
  );

  const onBgMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0 && e.button !== 1) return;
      const target = e.target as HTMLElement;
      if (target.dataset?.canvas === 'true' || target.tagName === 'svg') {
        onPanStart(e);
      }
    },
    [onPanStart]
  );

  const onBgDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.dataset?.canvas === 'true' || target.tagName === 'svg') {
        fitView(worldBounds);
      }
    },
    [fitView, worldBounds]
  );

  // SVG 点击：编辑模式下点击线直接删除
  const onSvgClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const connId = target.getAttribute?.('data-conn-id');
    if (!connId) return;
    if (editMode) {
      onDeleteConnection?.(Number(connId));
    }
  }, [editMode, onDeleteConnection]);

  const onSvgContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const connId = target.getAttribute?.('data-conn-id');
    // 连线点击即删除，不需要右键菜单；右键空白处显示添加节点菜单
    if (!connId && editMode) {
      setCtxMenu({ x: e.clientX, y: e.clientY, nodeId: null, connId: null });
    }
  }, [editMode]);

  const handleCtx = useCallback((e: React.MouseEvent, nid: number | null, cid: number | null) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu({ x: e.clientX, y: e.clientY, nodeId: nid, connId: cid });
  }, []);

  useEffect(() => {
    const h = () => setCtxMenu(null);
    window.addEventListener('click', h);
    return () => window.removeEventListener('click', h);
  }, []);

  return (
    <div
      ref={containerRef}
      data-canvas="true"
      className="flex-1 relative overflow-hidden canvas-bg"
      onMouseDown={onBgMouseDown}
      onDoubleClick={onBgDoubleClick}
      onContextMenu={e => editMode && handleCtx(e, null, null)}
      onWheel={onWheel}
      style={{ cursor: isPanning ? 'grabbing' : dragRef.current ? 'grabbing' : (drawingConn ? 'crosshair' : 'default') }}
    >
      {/* SVG Layer */}
      <svg
        ref={svgRef}
        className="chain-svg"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
        }}
        onClick={onSvgClick}
        onContextMenu={onSvgContextMenu}
      />

      {/* Nodes Layer */}
      <div
        data-canvas="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          pointerEvents: 'none',
        }}
      >
        {nodes.map(node => (
          <ChainNode
            key={node.id}
            ref={el => {
              if (el) nodeRefs.current.set(node.id, el);
            }}
            node={node}
            isSelected={selectedId === node.id}
            isHighlighted={false}
            isDimmed={selectedId !== null && selectedId !== node.id && !connections.some(c => (c.fromNodeId === selectedId && c.toNodeId === node.id) || (c.toNodeId === selectedId && c.fromNodeId === node.id))}
            editMode={editMode}
            onSelect={onNodeClick}
            onDoubleClick={onNodeDoubleClick}
            onMouseDown={onNodeMouseDown}
            onContextMenu={e => editMode && handleCtx(e, node.id, null)}
            onAnchorMouseDown={onAnchorMouseDown}
          />
        ))}
      </div>

      {/* Minimap */}
      <Minimap
        nodes={nodes}
        viewRect={viewRect}
        worldBounds={worldBounds}
        onNavigate={(wx, wy) => navigateTo(wx, wy)}
      />

      {/* Legend */}
      <div className="absolute top-3 right-3 control-bar flex items-center gap-3 px-3 py-1.5">
        <span className="text-[10px] text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          上游
        </span>
        <span className="text-[10px] text-blue-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          中游
        </span>
        <span className="text-[10px] text-amber-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          下游
        </span>
        {nodes.some(n => n.isCrossIndustry) && (
          <span className="text-[10px] text-violet-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            跨产业
          </span>
        )}
      </div>

      {/* 手动连线提示 */}
      {editMode && drawingConn && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 control-bar px-3 py-1.5 text-[11px] text-fg-accent animate-fade-in">
          <Link2 size={12} className="inline mr-1" />
          拖拽到目标节点释放以创建连线
        </div>
      )}

      {/* Context Menu */}
      {ctxMenu && editMode && (
        <div className="context-menu" style={{ left: ctxMenu.x, top: ctxMenu.y }}>
          {ctxMenu.nodeId === null && ctxMenu.connId === null && (
            <div className="context-menu-item" onClick={() => { onAddNode?.(null); setCtxMenu(null); }}>
              <Plus size={14} />
              添加根节点
              <span className="kbd-shortcut">A</span>
            </div>
          )}
          {ctxMenu.nodeId !== null && (
            <>
              <div
                className="context-menu-item"
                onClick={() => {
                  onDrillDown(ctxMenu.nodeId!, '', '');
                  setCtxMenu(null);
                }}
              >
                <Maximize2 size={14} />
                下钻查看
                <span className="kbd-shortcut">↵</span>
              </div>
              {onAddNode && (
                <div className="context-menu-item" onClick={() => { onAddNode?.(ctxMenu.nodeId); setCtxMenu(null); }}>
                  <Plus size={14} />
                  添加子节点
                </div>
              )}
              {onDeleteNode && (
                <>
                  <div className="context-menu-divider" />
                  <div
                    className="context-menu-item delete"
                    onClick={() => {
                      if (confirm('确定删除此节点及其所有子节点？')) onDeleteNode(ctxMenu.nodeId!);
                      setCtxMenu(null);
                    }}
                  >
                    <Minus size={14} />
                    删除节点
                    <span className="kbd-shortcut">Del</span>
                  </div>
                </>
              )}
            </>
          )}

        </div>
      )}
    </div>
  );
}
