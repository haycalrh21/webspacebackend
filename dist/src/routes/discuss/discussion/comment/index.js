import { Router } from "express";
// import { createDiscuss, getTasks } from "./discussionController.js";
import { z } from "zod";
import { validateData } from "../../../../middlewares/validationMiddlewares.js";
import { createComment, getComments } from "./CommentController.js";
const router = Router();
export const createCommentSchema = z.object({
    comment: z.string({ message: "Comment is required" }).trim().min(3),
    userId: z.number({ required_error: "User ID is required" }),
});
router.get("/", getComments);
router.get("/:id");
router.post("/", validateData(createCommentSchema), createComment);
router.delete("/");
export default router;
