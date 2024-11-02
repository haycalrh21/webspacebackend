import { Router } from "express";
import { createDiscuss, getTasks } from "./discussionController.js";
import { z } from "zod";
import { validateData } from "../../../middlewares/validationMiddlewares.js";
const router = Router();

export const createDiscussSchema = z.object({
  title: z.string({ message: "Title is required" }).min(5),
  description: z.string({ message: "Description is required" }).min(5),
  category: z.string({ message: "Category is required" }).min(1),
});

router.get("/", getTasks);
router.get("/:id");
router.post("/", createDiscuss, validateData(createDiscussSchema));
router.delete("/");

export default router;
