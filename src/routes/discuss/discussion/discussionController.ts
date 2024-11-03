import { Request, Response } from "express";
import { db } from "../../../db/index.js";
import { eq } from "drizzle-orm";
import { sql, desc } from "drizzle-orm";

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

export async function getDiscusses(req: Request, res: Response) {
  try {
    const discusses = await db
      .select({
        id: discussTable.id,
        title: discussTable.title,
        description: discussTable.description,
        created_at: discussTable.createdAt,
        category: discussTable.category,
        userId: userTable.id,
        name: userTable.name,
      })
      .from(discussTable)
      .innerJoin(userTable, eq(discussTable.userId, userTable.id))
      .orderBy(desc(discussTable.createdAt));
    res.json(discusses);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "An error occurred while fetching projects",
    });
  }
}
