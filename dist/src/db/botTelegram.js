import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
export const botTable = pgTable("bots", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    chat_id: varchar({ length: 255 }).notNull(),
    username: varchar({ length: 255 }).notNull(),
    message_id: varchar({ length: 255 }).notNull(),
    text: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ precision: 6 }).notNull().defaultNow(),
});
