import { memo, useCallback } from 'react';

interface MinimapNode {
  id: number;
  x: number;
  y: number;
  level: string;
}

interface MinimapProps {
  nodes: MinimapNode[];
  viewRect: { x: number; y: number; width: number; height: number };
  worldBounds: { minX: number; minY: number; maxX: number; maxY: number };
  onNavigate: (worldX: number, worldY: number) => void;
}

const LEVEL_COLORS: Record<string, string> = {
  upstream: '#34d399',
  midstream: '#60a5fa',
  downstream: '#fbbf24',
  general: '#a78bfa',
};

const MAP_W = 160;
const MAP_H = 100;

export const Minimap = memo(function Minimap({
  nodes,
  viewRect,
  worldBounds,
  onNavigate,
}: MinimapProps) {
  const padding = 20;
  const worldW = Math.max(worldBounds.maxX - worldBounds.minX + padding * 2, 1);
  const worldH = Math.max(worldBounds.maxY - worldBounds.minY + padding * 2, 1);
  const scaleX = MAP_W / worldW;
  const scaleY = MAP_H / worldH;
  const scale = Math.min(scaleX, scaleY);

  const offsetX = (MAP_W - worldW * scale) / 2;
  const offsetY = (MAP_H - worldH * scale) / 2;

  const toMapX = useCallback((wx: number) => offsetX + (wx - worldBounds.minX + padding) * scale, [offsetX, scale, worldBounds.minX]);
  const toMapY = useCallback((wy: number) => offsetY + (wy - worldBounds.minY + padding) * scale, [offsetY, scale, worldBounds.minY]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const wx = worldBounds.minX - padding + (mx - offsetX) / scale;
    const wy = worldBounds.minY - padding + (my - offsetY) / scale;
    onNavigate(wx, wy);
  }, [worldBounds, offsetX, offsetY, scale, onNavigate]);

  return (
    <div className="minimap" onClick={handleClick} title="点击跳转">
      {/* 节点点 */}
      {nodes.map(node => (
        <div
          key={node.id}
          className="minimap-node"
          style={{
            left: toMapX(node.x),
            top: toMapY(node.y),
            background: LEVEL_COLORS[node.level] ?? '#94a3b8',
          }}
        />
      ))}

      {/* 视口框 */}
      <div
        className="minimap-viewport"
        style={{
          left: toMapX(viewRect.x),
          top: toMapY(viewRect.y),
          width: Math.max(viewRect.width * scale, 8),
          height: Math.max(viewRect.height * scale, 6),
        }}
      />
    </div>
  );
});

Minimap.displayName = 'Minimap';
