import { Router } from "express";
import { createProject, deleteProject, getProject, getProjectById, } from "./projectController.js";
import { z } from "zod";
import { validateData } from "../../../middlewares/validationMiddlewares.js";
import { verifyToken } from "../../../middlewares/authMiddlewares.js";
const router = Router();
// Skema validasi untuk mendukung array imageUrls
export const createProjectSchema = z.object({
    name: z.string({ message: "Project name is required" }).min(5),
    images: z
        .array(z.string().refine((img) => {
        // Memastikan bahwa string dimulai dengan "data:image/"
        return img.startsWith("data:image/");
    }, {
        message: "Each image must be a valid base64 string",
    }))
        .nonempty("At least one image is required"),
});
router.get("/", getProject);
router.get("/:id", getProjectById);
router.post("/", verifyToken, validateData(createProjectSchema), createProject);
router.delete("/", deleteProject);
export default router;
