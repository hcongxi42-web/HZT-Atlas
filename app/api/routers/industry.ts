import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { industries, chainNodes, stocks, nodeConnections } from "@db/schema";
import { eq } from "drizzle-orm";

export const industryRouter = createRouter({
  // 获取所有产业
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(industries).orderBy(industries.id);
  }),

  // 获取产业详情 + 所有节点 + 股票 + 连接
  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [industry] = await db
        .select()
        .from(industries)
        .where(eq(industries.slug, input.slug));
      if (!industry) return null;

      const nodes = await db
        .select()
        .from(chainNodes)
        .where(eq(chainNodes.industryId, industry.id))
        .orderBy(chainNodes.sortOrder);

      const allStocks = await db
        .select()
        .from(stocks);

      const connections = await db
        .select()
        .from(nodeConnections)
        .where(eq(nodeConnections.industryId, industry.id));

      return { industry, nodes, stocks: allStocks, connections };
    }),

  // 获取某个产业的所有节点（树状结构）
  getNodes: publicQuery
    .input(z.object({ industryId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const nodes = await db
        .select()
        .from(chainNodes)
        .where(eq(chainNodes.industryId, input.industryId))
        .orderBy(chainNodes.sortOrder);

      const allStocks = await db
        .select()
        .from(stocks);

      return nodes.map((node) => ({
        ...node,
        stocks: allStocks.filter((s) => s.nodeId === node.id),
      }));
    }),

  // 创建产业
  create: publicQuery
    .input(z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      icon: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(industries).values(input);
      return { id: Number(result[0].insertId) };
    }),

  // 删除产业（级联删除所有相关数据）
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      // Delete stocks, connections, nodes, then industry
      const allNodes = await db.select().from(chainNodes).where(eq(chainNodes.industryId, input.id));
      for (const n of allNodes) {
        await db.delete(stocks).where(eq(stocks.nodeId, n.id));
      }
      await db.delete(nodeConnections).where(eq(nodeConnections.industryId, input.id));
      await db.delete(chainNodes).where(eq(chainNodes.industryId, input.id));
      await db.delete(industries).where(eq(industries.id, input.id));
      return { success: true };
    }),
});
