import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const projectTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  imageUrls: json().notNull(), // Menyimpan URL gambar dalam format JSON
});
