import { useMemo } from 'react';
import { getNodePath } from '@/data/semiconductor';
import type { IndustryData } from '@/data/semiconductor';
import type { SearchItem } from '@/components/chain/CommandPalette';

interface UseSearchItemsParams {
  industries: IndustryData[];
  setCurrentSlug: (slug: string) => void;
  setCurrentParentId: (parentId: number | null) => void;
  setSelectedNodeId: (nodeId: number | null) => void;
}

export function useSearchItems({
  industries,
  setCurrentSlug,
  setCurrentParentId,
  setSelectedNodeId,
}: UseSearchItemsParams): SearchItem[] {
  return useMemo(() => {
    const items: SearchItem[] = [];

    // Industries
    industries.forEach(ind => {
      items.push({
        id: `ind-${ind.slug}`,
        type: 'industry',
        name: ind.name,
        action: () => {
          setCurrentSlug(ind.slug);
          setCurrentParentId(null);
          setSelectedNodeId(null);
        },
      });
    });

    // Nodes (all levels) — collected once to avoid repeated flatMap
    const allNodes = industries.flatMap(ind => [
      ...ind.rootNodes,
      ...Object.values(ind.childNodes).flat(),
    ]);

    allNodes.forEach(n => {
      items.push({
        id: `node-${n.id}`,
        type: 'node',
        name: n.name,
        subtitle: n.description ?? undefined,
        meta: n.level,
        action: () => {
          const targetInd = industries.find(
            ind =>
              ind.rootNodes.some(r => r.id === n.id) ||
              Object.values(ind.childNodes).flat().some(c => c.id === n.id),
          );
          if (targetInd) {
            setCurrentSlug(targetInd.slug);
            const path = getNodePath(targetInd, n.id);
            setCurrentParentId(path.length > 1 ? (path[path.length - 2]?.id ?? null) : null);
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
            const targetInd = industries.find(
              ind =>
                ind.rootNodes.some(r => r.id === node.id) ||
                Object.values(ind.childNodes).flat().some(c => c.id === node.id),
            );
            if (targetInd) {
              setCurrentSlug(targetInd.slug);
              const path = getNodePath(targetInd, node.id);
              setCurrentParentId(path.length > 1 ? (path[path.length - 2]?.id ?? null) : null);
              setSelectedNodeId(node.id);
            }
          },
        });
      });
    }

    return items;
  }, [industries, setCurrentSlug, setCurrentParentId, setSelectedNodeId]);
}
