import { createRouter, publicQuery } from "./middleware";
import { industryRouter } from "./routers/industry";
import { chainNodeRouter } from "./routers/chainNode";
import { stockRouter } from "./routers/stock";
import { connectionRouter } from "./routers/connection";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  industry: industryRouter,
  chainNode: chainNodeRouter,
  stock: stockRouter,
  connection: connectionRouter,
});

export type AppRouter = typeof appRouter;
