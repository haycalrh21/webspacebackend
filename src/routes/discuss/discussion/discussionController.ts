import { Request, Response } from "express";
import { db } from "../../../db/index.js";
import { eq } from "drizzle-orm";

import { discussTable } from "../../../db/disscusSchema.js";
import { userTable } from "../../../db/userSchema.js";
export async function createDiscuss(req: Request, res: Response) {
  const { title, description, category, userId } = req.body;
  try {
    const [task] = await db
      .insert(discussTable)
      .values({
        title,
        description,
        category,
        userId,
      })
      .returning();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function getTasks(req: Request, res: Response) {
  db.select({
    id: discussTable.id,
    title: discussTable.title,
    description: discussTable.description,
    createAt: discussTable.createdAt,
    category: discussTable.category,
    userId: userTable.id, // Mengambil userId dari tabel user
    username: userTable.name, // Contoh kolom lain dari tabel user
  })
    .from(discussTable)
    .innerJoin(userTable, eq(discussTable.userId, userTable.id)) // Join berdasarkan relasi userId
    .then((discuss) => {
      res.json(discuss);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({
        error: "An error occurred while fetching projects",
      });
    });
}
