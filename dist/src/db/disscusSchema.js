import { integer, pgTable, varchar, timestamp, } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const discussTable = pgTable("discuss", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    category: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
        .notNull()
        .default(sql `now()`),
});
