import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { userTable } from "../../db/userSchema.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  const data = req.body;
  data.password = await bcrypt.hash(data.password, 10); // gunakan async/await tanpa hashSync

  try {
    const [user] = await db.insert(userTable).values(data).returning();
    res.status(200).json(user); // mengirimkan response JSON dengan status 200
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!user) {
    res.sendStatus(401).json({ error: "Authentication failed" });
    return;
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.sendStatus(401).json({ error: "Authentication failed" });
    return;
  }

  const token = jwt.sign({ id: user.id }, "secret", {
    expiresIn: "1h",
  });
  console.log(user, token);
  res.sendStatus(200);
}
