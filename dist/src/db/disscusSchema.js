import { integer, pgTable, varchar, timestamp, } from "drizzle-orm/pg-core";
export const discussTable = pgTable("discuss", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    category: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ precision: 6 }).notNull().defaultNow(),
});
