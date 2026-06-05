import { useState, useRef, useCallback, useEffect } from 'react';

interface Transform {
  scale: number;
  x: number;
  y: number;
}

interface UseCanvasTransformOptions {
  minScale?: number;
  maxScale?: number;
  zoomStep?: number;
  containerRef: React.RefObject<HTMLElement | null>;
}

export function useCanvasTransform(options: UseCanvasTransformOptions) {
  const { minScale = 0.2, maxScale = 3, zoomStep = 0.1, containerRef } = options;

  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const panStartRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const spacePressedRef = useRef(false);

  // 惯性动画
  useEffect(() => {
    const decay = 0.9;
    const minVelocity = 0.5;

    const loop = () => {
      if (Math.abs(velocityRef.current.x) > minVelocity || Math.abs(velocityRef.current.y) > minVelocity) {
        setTransform(prev => ({
          ...prev,
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y,
        }));
        velocityRef.current.x *= decay;
        velocityRef.current.y *= decay;
        rafRef.current = requestAnimationFrame(loop);
      } else {
        velocityRef.current = { x: 0, y: 0 };
      }
    };

    if (!isPanning && (Math.abs(velocityRef.current.x) > minVelocity || Math.abs(velocityRef.current.y) > minVelocity)) {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [isPanning]);

  // 以某点为中心缩放
  const zoomAt = useCallback((clientX: number, clientY: number, delta: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setTransform(prev => {
      const newScale = Math.min(maxScale, Math.max(minScale, prev.scale + delta));
      if (newScale === prev.scale) return prev;

      const scaleRatio = newScale / prev.scale;
      const newX = x - (x - prev.x) * scaleRatio;
      const newY = y - (y - prev.y) * scaleRatio;

      return { scale: newScale, x: newX, y: newY };
    });
  }, [containerRef, minScale, maxScale]);

  const zoomIn = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, zoomStep);
  }, [containerRef, zoomAt, zoomStep]);

  const zoomOut = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, -zoomStep);
  }, [containerRef, zoomAt, zoomStep]);

  const resetView = useCallback(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  // 滚轮缩放
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    zoomAt(e.clientX, e.clientY, delta);
  }, [zoomAt, zoomStep]);

  // 平移开始
  const onPanStart = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 && e.button !== 1) return;
    // 只有在按中键、按空格、或点在空白处才平移
    const isSpace = spacePressedRef.current;
    const isMiddle = e.button === 1;
    const isBackground = (e.target as HTMLElement).dataset?.canvas === 'true';

    if (!isSpace && !isMiddle && !isBackground) return;

    e.preventDefault();
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  }, [transform]);

  // 平移中
  const onPanMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const newX = e.clientX - panStartRef.current.x;
    const newY = e.clientY - panStartRef.current.y;

    velocityRef.current = {
      x: e.clientX - lastPosRef.current.x,
      y: e.clientY - lastPosRef.current.y,
    };
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    setTransform(prev => ({ ...prev, x: newX, y: newY }));
  }, [isPanning]);

  // 平移结束
  const onPanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // 空格键临时平移模式
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        spacePressedRef.current = true;
        document.body.style.cursor = 'grab';
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        spacePressedRef.current = false;
        document.body.style.cursor = '';
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.body.style.cursor = '';
    };
  }, []);

  // 将屏幕坐标转换为世界坐标
  const screenToWorld = useCallback((screenX: number, screenY: number) => {
    return {
      x: (screenX - transform.x) / transform.scale,
      y: (screenY - transform.y) / transform.scale,
    };
  }, [transform]);

  // 将世界坐标转换为屏幕坐标
  const worldToScreen = useCallback((worldX: number, worldY: number) => {
    return {
      x: worldX * transform.scale + transform.x,
      y: worldY * transform.scale + transform.y,
    };
  }, [transform]);

  const navigateTo = useCallback((worldX: number, worldY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2;
    setTransform(prev => ({
      ...prev,
      x: cx - worldX * prev.scale,
      y: cy - worldY * prev.scale,
    }));
    velocityRef.current = { x: 0, y: 0 };
  }, [containerRef]);

  const fitView = useCallback((bounds?: { minX: number; minY: number; maxX: number; maxY: number }) => {
    const container = containerRef.current;
    if (!container) return;
    if (!bounds) {
      resetView();
      return;
    }
    const padding = 80;
    const bw = bounds.maxX - bounds.minX + padding * 2;
    const bh = bounds.maxY - bounds.minY + padding * 2;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scale = Math.min(cw / bw, ch / bh, maxScale);
    const x = cw / 2 - (bounds.minX + bw / 2 - padding) * scale;
    const y = ch / 2 - (bounds.minY + bh / 2 - padding) * scale;
    setTransform({ scale, x, y });
    velocityRef.current = { x: 0, y: 0 };
  }, [containerRef, maxScale, resetView]);

  return {
    transform,
    isPanning,
    zoomIn,
    zoomOut,
    resetView,
    zoomAt,
    navigateTo,
    fitView,
    onWheel,
    onPanStart,
    onPanMove,
    onPanEnd,
    screenToWorld,
    worldToScreen,
    spacePressed: spacePressedRef,
  };
}
