import { Request, Response } from "express";
import { db } from "../../../../db/index.js";
import { eq, desc } from "drizzle-orm";

import { commentTable } from "../../../../db/commentSchema.js";
import { userTable } from "../../../../db/userSchema.js";
import { discussTable } from "../../../../db/disscusSchema.js";
export async function createComment(req: Request, res: Response) {
  const { postId, comment, userId } = req.body;
  try {
    const [task] = await db
      .insert(commentTable)
      .values({
        postId,
        comment,
        userId,
      })
      .returning();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

// export async function getTasks(req: Request, res: Response) {
//   db.select({
//     id: discussTable.id,
//     title: discussTable.title,
//     description: discussTable.description,
//     createAt: discussTable.createdAt,
//     category: discussTable.category,
//     userId: userTable.id, // Mengambil userId dari tabel user
//     username: userTable.name, // Contoh kolom lain dari tabel user
//   })
//     .from(discussTable)
//     .innerJoin(userTable, eq(discussTable.userId, userTable.id)) // Join berdasarkan relasi userId
//     .then((discuss) => {
//       res.json(discuss);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send({
//         error: "An error occurred while fetching projects",
//       });
//     });
// }
export async function getComments(req: Request, res: Response) {
  try {
    const comments = await db
      .select({
        id: commentTable.id,
        postId: discussTable.id, // Menggunakan postId dari discussTable
        comment: commentTable.comment,
        createdAt: commentTable.createdAt,
        userId: userTable.id,
        username: userTable.name,
      })
      .from(commentTable)
      .innerJoin(userTable, eq(commentTable.userId, userTable.id)) // Join dengan userTable
      .innerJoin(discussTable, eq(commentTable.postId, discussTable.id))

      .orderBy(desc(discussTable.createdAt)); // Join dengan discussTable berdasarkan postId

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "An error occurred while fetching comments",
    });
  }
}
