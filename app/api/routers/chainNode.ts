import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { chainNodes, stocks, nodeConnections } from "@db/schema";
import { eq, and, isNull, inArray } from "drizzle-orm";

export const chainNodeRouter = createRouter({
  // 获取指定层级的节点（按industryId + parentId）
  listByParent: publicQuery
    .input(z.object({
      industryId: z.number(),
      parentId: z.number().nullable(),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      const where = input.parentId === null
        ? and(eq(chainNodes.industryId, input.industryId), isNull(chainNodes.parentId))
        : and(eq(chainNodes.industryId, input.industryId), eq(chainNodes.parentId, input.parentId));

      const nodes = await db
        .select()
        .from(chainNodes)
        .where(where)
        .orderBy(chainNodes.sortOrder);

      // 获取每个节点下的股票数
      if (nodes.length === 0) return [];

      const nodeIds = nodes.map(n => n.id);
      const allStocks = await db
        .select()
        .from(stocks)
        .where(inArray(stocks.nodeId, nodeIds));

      // 统计子节点数
      const childrenCounts = await Promise.all(
        nodes.map(async (node) => {
          const children = await db
            .select({ count: chainNodes.id })
            .from(chainNodes)
            .where(eq(chainNodes.parentId, node.id));
          return { nodeId: node.id, childCount: children.length };
        })
      );

      return nodes.map((node) => ({
        ...node,
        stockCount: allStocks.filter(s => s.nodeId === node.id).length,
        childCount: childrenCounts.find(c => c.nodeId === node.id)?.childCount ?? 0,
        stocks: allStocks.filter(s => s.nodeId === node.id),
      }));
    }),

  // 获取某个节点的完整路径（面包屑用）
  getPath: publicQuery
    .input(z.object({ nodeId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const path = [];
      let currentId = input.nodeId;

      for (let i = 0; i < 20; i++) {
        const [node] = await db
          .select()
          .from(chainNodes)
          .where(eq(chainNodes.id, currentId));
        if (!node) break;
        path.unshift({ id: node.id, name: node.name, level: node.level });
        if (!node.parentId) break;
        currentId = node.parentId;
      }

      return path;
    }),

  // 获取节点详情（含股票和子节点）
  getDetail: publicQuery
    .input(z.object({ nodeId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [node] = await db
        .select()
        .from(chainNodes)
        .where(eq(chainNodes.id, input.nodeId));
      if (!node) return null;

      const nodeStocks = await db
        .select()
        .from(stocks)
        .where(eq(stocks.nodeId, input.nodeId));

      const children = await db
        .select()
        .from(chainNodes)
        .where(eq(chainNodes.parentId, input.nodeId))
        .orderBy(chainNodes.sortOrder);

      // 获取跨分支连接
      const connections = await db
        .select()
        .from(nodeConnections)
        .where(eq(nodeConnections.fromNodeId, input.nodeId));

      return { ...node, stocks: nodeStocks, children, connections };
    }),

  // 创建节点
  create: publicQuery
    .input(z.object({
      industryId: z.number(),
      parentId: z.number().nullable(),
      name: z.string().min(1),
      level: z.enum(["upstream", "midstream", "downstream", "general"]),
      description: z.string().optional(),
      keyProducts: z.array(z.string()).optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(chainNodes).values({
        industryId: input.industryId,
        parentId: input.parentId,
        name: input.name,
        level: input.level,
        description: input.description ?? null,
        keyProducts: input.keyProducts ?? [],
        sortOrder: input.sortOrder ?? 0,
      });
      return { id: Number(result[0].insertId) };
    }),

  // 更新节点
  update: publicQuery
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      level: z.enum(["upstream", "midstream", "downstream", "general"]).optional(),
      description: z.string().optional(),
      keyProducts: z.array(z.string()).optional(),
      sortOrder: z.number().optional(),
      parentId: z.number().nullable().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(chainNodes).set(data).where(eq(chainNodes.id, id));
      return { success: true };
    }),

  // 删除节点（级联删除子节点和股票）
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();

      // 递归获取所有子节点
      const allIds = [input.id];
      let toCheck = [input.id];
      for (let i = 0; i < 20; i++) {
        if (toCheck.length === 0) break;
        const children = await db
          .select({ id: chainNodes.id })
          .from(chainNodes)
          .where(inArray(chainNodes.parentId, toCheck));
        const childIds = children.map(c => c.id);
        allIds.push(...childIds);
        toCheck = childIds;
      }

      // 删除相关股票
      await db.delete(stocks).where(inArray(stocks.nodeId, allIds));
      // 删除连接关系
      await db.delete(nodeConnections).where(inArray(nodeConnections.fromNodeId, allIds));
      await db.delete(nodeConnections).where(inArray(nodeConnections.toNodeId, allIds));
      // 删除所有节点（从叶子到根）
      for (let i = allIds.length - 1; i >= 0; i--) {
        await db.delete(chainNodes).where(eq(chainNodes.id, allIds[i]));
      }

      return { success: true, deletedCount: allIds.length };
    }),

  // 获取整个产业的树状结构（用于总览）
  getTree: publicQuery
    .input(z.object({ industryId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const allNodes = await db
        .select()
        .from(chainNodes)
        .where(eq(chainNodes.industryId, input.industryId))
        .orderBy(chainNodes.sortOrder);

      const allStocks = await db.select().from(stocks);

      const allConnections = await db
        .select()
        .from(nodeConnections)
        .where(eq(nodeConnections.industryId, input.industryId));

      // 构建树
      type Enriched = Record<string, unknown>;
      const nodeMap = new Map<number, Enriched>();

      for (const n of allNodes) {
        nodeMap.set(n.id, { ...n, children: [], stocks: allStocks.filter(s => s.nodeId === n.id) });
      }

      const roots: Enriched[] = [];

      for (const node of allNodes) {
        const enriched = nodeMap.get(node.id);
        if (!enriched) continue;
        if (node.parentId && nodeMap.has(node.parentId)) {
          (nodeMap.get(node.parentId) as any).children.push(enriched);
        } else {
          roots.push(enriched);
        }
      }

      return { nodes: roots, connections: allConnections, flatNodes: allNodes };
    }),
});
