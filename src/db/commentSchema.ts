import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const commentTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  postId: integer().notNull(),
  comment: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ precision: 6 }).notNull().defaultNow(),
});
