import { Router } from "express";
import { createTasks, getTasks, updateTask } from "./tasksController.js";
const router = Router();

router.get("/", getTasks);
router.patch("/:id", updateTask);
router.post("/", createTasks);
router.delete("/");

export default router;
