import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { stocks } from "@db/schema";
import { eq, inArray } from "drizzle-orm";

export const stockRouter = createRouter({
  // 获取节点下的所有股票
  listByNode: publicQuery
    .input(z.object({ nodeId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(stocks)
        .where(eq(stocks.nodeId, input.nodeId));
    }),

  // 批量获取股票
  listByNodes: publicQuery
    .input(z.object({ nodeIds: z.array(z.number()) }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(stocks)
        .where(inArray(stocks.nodeId, input.nodeIds));
    }),

  // 创建股票
  create: publicQuery
    .input(z.object({
      nodeId: z.number(),
      name: z.string().min(1),
      code: z.string().min(1),
      tag: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(stocks).values(input);
      return { id: Number(result[0].insertId) };
    }),

  // 批量创建股票
  createMany: publicQuery
    .input(z.object({
      stocks: z.array(z.object({
        nodeId: z.number(),
        name: z.string().min(1),
        code: z.string().min(1),
        tag: z.string().min(1),
      })),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      if (input.stocks.length === 0) return { ids: [] };
      const result = await db.insert(stocks).values(input.stocks);
      return { ids: input.stocks.map((_, i) => Number(result[0].insertId) + i) };
    }),

  // 更新股票
  update: publicQuery
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      code: z.string().optional(),
      tag: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(stocks).set(data).where(eq(stocks.id, id));
      return { success: true };
    }),

  // 删除股票
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(stocks).where(eq(stocks.id, input.id));
      return { success: true };
    }),
});
