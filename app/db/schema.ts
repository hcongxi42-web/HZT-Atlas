import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  bigint,
  json,
  timestamp,
  index,
} from "drizzle-orm/mysql-core";

// 产业根表
export const industries = mysqlTable("industries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }).default("Box"),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// 树状产业链节点表
export const chainNodes = mysqlTable("chain_nodes", {
  id: serial("id").primaryKey(),
  industryId: bigint("industry_id", { mode: "number", unsigned: true }).notNull(),
  parentId: bigint("parent_id", { mode: "number", unsigned: true }),
  name: varchar("name", { length: 200 }).notNull(),
  level: varchar("level", { length: 20 }).notNull(), // upstream / midstream / downstream
  description: text("description"),
  keyProducts: json("key_products").$type<string[]>(),
  sortOrder: int("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  index("idx_industry").on(table.industryId),
  index("idx_parent").on(table.parentId),
]);

// 股票表
export const stocks = mysqlTable("stocks", {
  id: serial("id").primaryKey(),
  nodeId: bigint("node_id", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 20 }).notNull(),
  tag: varchar("tag", { length: 200 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("idx_node").on(table.nodeId),
]);

// 节点间连接关系（跨分支连线）
export const nodeConnections = mysqlTable("node_connections", {
  id: serial("id").primaryKey(),
  industryId: bigint("industry_id", { mode: "number", unsigned: true }).notNull(),
  fromNodeId: bigint("from_node_id", { mode: "number", unsigned: true }).notNull(),
  toNodeId: bigint("to_node_id", { mode: "number", unsigned: true }).notNull(),
  label: varchar("label", { length: 100 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("idx_conn_industry").on(table.industryId),
]);
