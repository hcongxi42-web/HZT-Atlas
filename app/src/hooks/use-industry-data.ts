import { useState, useCallback, useMemo } from 'react';
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

// === 工具函数 ===

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function initIndustries(): IndustryData[] {
  return [
    deepClone(semiconductorData),
    deepClone(powerData),
    deepClone(gridEquipmentData),
    deepClone(metalData),
    deepClone(aerospaceData),
    deepClone(robotData),
    deepClone(batteryData),
  ];
}

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

export interface UseIndustryDataReturn {
  // State
  industries: IndustryData[];
  currentSlug: string;
  currentParentId: number | null;
  selectedNodeId: number | null;
  editMode: boolean;
  addModal: { open: boolean; parentId: number | null };

  // Derived
  industry: IndustryData;
  currentNodes: LocalNode[];
  selectedDetail: ReturnType<typeof getNodeDetail>;
  breadcrumbPath: { id: number; name: string; level: string }[];
  graphNodes: {
    id: number;
    name: string;
    level: string;
    description: string | null;
    plainLanguageDescription: string | null;
    x: number;
    y: number;
    stockCount: number;
    childCount: number;
    isCrossIndustry: boolean;
  }[];
  graphConnections: IndustryData['connections'];

  // Actions
  selectIndustry: (slug: string) => void;
  setCurrentSlug: (slug: string) => void;
  setCurrentParentId: (parentId: number | null) => void;
  drillDown: (nodeId: number) => void;
  breadcrumbNavigate: (item: { id: number } | null) => void;
  goBack: () => void;
  setSelectedNodeId: (id: number | null) => void;
  toggleEdit: () => void;
  openAddModal: (parentId: number | null) => void;
  closeAddModal: () => void;
  createNode: (name: string, level: LocalNode['level']) => void;
  deleteNode: (id: number) => void;
  createConnection: (fromNodeId: number, toNodeId: number) => void;
  deleteConnection: (id: number) => void;
}

export function useIndustryData(): UseIndustryDataReturn {
  const [industries, setIndustries] = useState<IndustryData[]>(initIndustries);
  const [currentSlug, setCurrentSlug] = useState(industries[0].slug);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [addModal, setAddModal] = useState<{ open: boolean; parentId: number | null }>({
    open: false,
    parentId: null,
  });

  // === 派生数据 ===

  const industry = useMemo(
    () => industries.find(i => i.slug === currentSlug) ?? industries[0],
    [industries, currentSlug],
  );

  const currentNodes = useMemo(
    () => getNodesByParent(industry, currentParentId),
    [industry, currentParentId],
  );

  const selectedDetail = useMemo(() => {
    if (!selectedNodeId) return null;
    return getNodeDetail(industry, selectedNodeId);
  }, [selectedNodeId, industry]);

  const breadcrumbPath = useMemo(() => {
    if (!currentParentId) return [];
    return getNodePath(industry, currentParentId);
  }, [currentParentId, industry]);

  const currentNodeIds = useMemo(() => new Set(currentNodes.map(n => n.id)), [currentNodes]);

  const crossNodeIds = useMemo(() => {
    const ids = new Set<number>();
    industry.connections.forEach(c => {
      if (currentNodeIds.has(c.fromNodeId) && !currentNodeIds.has(c.toNodeId)) ids.add(c.toNodeId);
      if (currentNodeIds.has(c.toNodeId) && !currentNodeIds.has(c.fromNodeId)) ids.add(c.fromNodeId);
    });
    return ids;
  }, [industry, currentNodeIds]);

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

  const graphConnections = useMemo(() => {
    const nodeIds = new Set(graphNodes.map(n => n.id));
    return industry.connections.filter(
      c => nodeIds.has(c.fromNodeId) && nodeIds.has(c.toNodeId),
    );
  }, [industry, graphNodes]);

  // === 操作 ===

  const selectIndustry = useCallback((slug: string) => {
    setCurrentSlug(slug);
    setCurrentParentId(null);
    setSelectedNodeId(null);
  }, []);

  const drillDown = useCallback((nodeId: number) => {
    setCurrentParentId(nodeId);
    setSelectedNodeId(null);
  }, []);

  const breadcrumbNavigate = useCallback((item: { id: number } | null) => {
    setSelectedNodeId(null);
    setCurrentParentId(item?.id ?? null);
  }, []);

  const goBack = useCallback(() => {
    if (selectedNodeId) {
      setSelectedNodeId(null);
    } else if (currentParentId) {
      const path = getNodePath(industry, currentParentId);
      setCurrentParentId(path.length > 1 ? path[path.length - 2]?.id ?? null : null);
    }
  }, [selectedNodeId, currentParentId, industry]);

  const toggleEdit = useCallback(() => setEditMode(prev => !prev), []);

  const openAddModal = useCallback(
    (parentId: number | null) => {
      if (!editMode) return;
      setAddModal({ open: true, parentId });
    },
    [editMode],
  );

  const closeAddModal = useCallback(() => {
    setAddModal({ open: false, parentId: null });
  }, []);

  const createNode = useCallback(
    (name: string, level: LocalNode['level']) => {
      setIndustries(prev => {
        const next = deepClone(prev);
        const ind = next.find(i => i.slug === currentSlug);
        if (!ind) return prev;

        let maxId = 0;
        if (addModal.parentId === null) {
          ind.rootNodes.forEach(n => (maxId = Math.max(maxId, n.id)));
        } else {
          for (const children of Object.values(ind.childNodes)) {
            children.forEach(n => (maxId = Math.max(maxId, n.id)));
          }
          if (maxId === 0) {
            maxId = addModal.parentId! * 100;
          }
        }
        const newId = maxId + 1;

        const newNode: LocalNode = {
          id: newId,
          name,
          level,
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
          const parent =
            ind.rootNodes.find(n => n.id === addModal.parentId) ??
            Object.values(ind.childNodes)
              .flat()
              .find(n => n.id === addModal.parentId);
          if (parent) parent.childCount = ind.childNodes[addModal.parentId].length;
        }

        return next;
      });

      setAddModal({ open: false, parentId: null });
    },
    [addModal, currentSlug],
  );

  const deleteNode = useCallback(
    (id: number) => {
      setIndustries(prev => {
        const next = deepClone(prev);
        const ind = next.find(i => i.slug === currentSlug);
        if (!ind) return prev;

        const rootIdx = ind.rootNodes.findIndex(n => n.id === id);
        if (rootIdx >= 0) {
          ind.rootNodes.splice(rootIdx, 1);
          delete ind.childNodes[id];
          for (const children of Object.values(ind.childNodes)) {
            for (const c of children) {
              if (c.parentId === id) c.parentId = null;
            }
          }
          ind.connections = ind.connections.filter(c => c.fromNodeId !== id && c.toNodeId !== id);
          return next;
        }

        for (const [pid, children] of Object.entries(ind.childNodes)) {
          const idx = children.findIndex(n => n.id === id);
          if (idx >= 0) {
            children.splice(idx, 1);
            const parentId = Number(pid);
            const parent =
              ind.rootNodes.find(n => n.id === parentId) ??
              Object.values(ind.childNodes)
                .flat()
                .find(n => n.id === parentId);
            if (parent) parent.childCount = children.length;
            delete ind.childNodes[id];
            ind.connections = ind.connections.filter(c => c.fromNodeId !== id && c.toNodeId !== id);
            return next;
          }
        }

        return prev;
      });
      if (selectedNodeId === id) setSelectedNodeId(null);
      if (currentParentId === id) setCurrentParentId(null);
    },
    [currentSlug, selectedNodeId, currentParentId],
  );

  const createConnection = useCallback(
    (fromNodeId: number, toNodeId: number) => {
      if (fromNodeId === toNodeId) return;
      setIndustries(prev => {
        const next = deepClone(prev);
        const ind = next.find(i => i.slug === currentSlug);
        if (!ind) return prev;

        const exists = ind.connections.some(
          c => c.fromNodeId === fromNodeId && c.toNodeId === toNodeId,
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
    },
    [currentSlug],
  );

  const deleteConnection = useCallback(
    (id: number) => {
      setIndustries(prev => {
        const next = deepClone(prev);
        const ind = next.find(i => i.slug === currentSlug);
        if (!ind) return prev;
        ind.connections = ind.connections.filter(c => c.id !== id);
        return next;
      });
    },
    [currentSlug],
  );

  return {
    // State
    industries,
    currentSlug,
    currentParentId,
    selectedNodeId,
    editMode,
    addModal,
    // Derived
    industry,
    currentNodes,
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
  };
}
