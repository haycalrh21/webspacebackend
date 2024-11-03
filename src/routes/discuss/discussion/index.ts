import { Router } from "express";
import { createDiscuss, getDiscusses } from "./discussionController.js";
import { z } from "zod";
import { validateData } from "../../../middlewares/validationMiddlewares.js";
const router = Router();

export const createDiscussSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .trim()
    .min(5, { message: "Title must be at least 5 characters long" }),
  description: z
    .string({ message: "Description is required" })
    .trim()
    .min(5, { message: "Description must be at least 5 characters long" }),
  category: z
    .string({ message: "Category is required" })
    .trim()
    .min(1, { message: "Category cannot be empty" }),
  userId: z.number({ required_error: "User ID is required" }),
});

router.get("/", getDiscusses);
router.get("/:id");
router.post("/", validateData(createDiscussSchema), createDiscuss);
router.delete("/");

export default router;
