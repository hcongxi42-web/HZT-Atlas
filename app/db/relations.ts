import { relations } from "drizzle-orm";
import { industries, chainNodes, stocks, nodeConnections } from "./schema";

export const industriesRelations = relations(industries, ({ many }) => ({
  nodes: many(chainNodes),
  connections: many(nodeConnections),
}));

export const chainNodesRelations = relations(chainNodes, ({ one, many }) => ({
  industry: one(industries, {
    fields: [chainNodes.industryId],
    references: [industries.id],
  }),
  parent: one(chainNodes, {
    fields: [chainNodes.parentId],
    references: [chainNodes.id],
  }),
  children: many(chainNodes),
  stocks: many(stocks),
}));

export const stocksRelations = relations(stocks, ({ one }) => ({
  node: one(chainNodes, {
    fields: [stocks.nodeId],
    references: [chainNodes.id],
  }),
}));

export const nodeConnectionsRelations = relations(nodeConnections, ({ one }) => ({
  industry: one(industries, {
    fields: [nodeConnections.industryId],
    references: [industries.id],
  }),
}));
