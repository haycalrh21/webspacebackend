import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import { taskTable } from "../../db/taskSchema.js";
export async function createTasks(req: Request, res: Response) {
  const { title } = req.body;
  try {
    const [task] = await db
      .insert(taskTable)
      .values({
        title,
        status: "not_finished",
      })
      .returning();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function getTasks(req: Request, res: Response) {
  db.select()
    .from(taskTable)
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .send({ error: "An error occurred while fetching projects" });
    });
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // Fetch the current task status
    const [currentTask] = await db
      .select()
      .from(taskTable)
      .where(eq(taskTable.id, Number(id)));

    if (!currentTask) {
      res.status(404).json({ error: "Task not found" });
    }

    // Toggle the status
    const newStatus =
      currentTask.status === "finished" ? "not_finished" : "finished";

    // Update the task with the new status
    const [updatedTask] = await db
      .update(taskTable)
      .set({ status: newStatus })
      .where(eq(taskTable.id, Number(id)))
      .returning();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
}
