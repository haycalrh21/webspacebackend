import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
export const taskTable = pgTable("tasks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    status: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ precision: 6 }).notNull().defaultNow(),
});
