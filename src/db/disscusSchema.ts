import {
  integer,
  pgTable,
  varchar,
  json,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const discussTable = pgTable("discuss", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  title: varchar().notNull(),
  description: text().notNull(),
  category: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});
