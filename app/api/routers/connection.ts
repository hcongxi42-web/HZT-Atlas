import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { nodeConnections } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const connectionRouter = createRouter({
  // 获取产业下的所有连接
  listByIndustry: publicQuery
    .input(z.object({ industryId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(nodeConnections)
        .where(eq(nodeConnections.industryId, input.industryId));
    }),

  // 创建连接
  create: publicQuery
    .input(z.object({
      industryId: z.number(),
      fromNodeId: z.number(),
      toNodeId: z.number(),
      label: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(nodeConnections).values(input);
      return { id: Number(result[0].insertId) };
    }),

  // 删除连接
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(nodeConnections).where(eq(nodeConnections.id, input.id));
      return { success: true };
    }),

  // 删除两个节点间的连接
  deleteBetween: publicQuery
    .input(z.object({
      fromNodeId: z.number(),
      toNodeId: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(nodeConnections).where(
        and(
          eq(nodeConnections.fromNodeId, input.fromNodeId),
          eq(nodeConnections.toNodeId, input.toNodeId),
        )
      );
      return { success: true };
    }),
});
