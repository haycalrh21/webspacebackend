import { Router } from "express";
// import { createDiscuss, getTasks } from "./discussionController.js";
import { z } from "zod";
import { validateData } from "../../../../middlewares/validationMiddlewares.js";
import { createComment, getComments } from "./CommentController.js";
const router = Router();
export const createCommentSchema = z.object({
    comment: z.string({ message: "Title is required" }).min(5),
});
router.get("/", getComments);
router.get("/:id");
router.post("/", validateData(createCommentSchema), createComment);
router.delete("/");
export default router;
