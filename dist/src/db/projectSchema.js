import { integer, pgTable, varchar, json, timestamp, } from "drizzle-orm/pg-core";
export const projectTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    imageUrls: json().notNull(),
    description: varchar({ length: 255 }).notNull(),
    language: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ precision: 6 }).notNull().defaultNow(),
});
