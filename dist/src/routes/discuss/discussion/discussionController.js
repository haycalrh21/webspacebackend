import { db } from "../../../db/index.js";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { discussTable } from "../../../db/disscusSchema.js";
import { userTable } from "../../../db/userSchema.js";
export async function createDiscuss(req, res) {
    const { title, description, category, userId } = req.body;
    try {
        const [task] = await db
            .insert(discussTable)
            .values({
            title: title.trim(),
            description: description.trim(),
            category: category.trim(),
            userId,
        })
            .returning();
        res.status(200).json(task);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create task" });
    }
}
export async function getDiscusses(req, res) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            error: "An error occurred while fetching projects",
        });
    }
}
