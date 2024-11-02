import { integer, pgTable, varchar, json, timestamp, } from "drizzle-orm/pg-core";
export const blogTable = pgTable("blogs", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull(),
    title: varchar({ length: 255 }).notNull(),
    imageUrls: json().notNull(),
    description: varchar({ length: 255 }).notNull(),
    category: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ precision: 6 }).notNull().defaultNow(),
});
