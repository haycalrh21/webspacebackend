import { Router } from "express";

import { z } from "zod";
import {
  getUpdates,
  handleTelegramWebhook,
  sendMessage,
} from "./botController.js";
// import { validateData } from "../../../middlewares/validationMiddlewares.js";
// import { verifyToken } from "../../../middlewares/authMiddlewares.js";
// import { createBlog, getBlog } from "./discussController.js";

const router = Router();

// Skema validasi untuk mendukung array imageUrls
// export const createBlogSchema = z.object({
//   // title: z.string({ message: "Title is required" }).min(5),
//   // description: z.string({ message: "Description is required" }).min(5),
//   // category: z.string({ message: "Category is required" }).min(1),
//   images: z
//     .array(
//       z.string().refine(
//         (img) => {
//           // Memastikan bahwa string dimulai dengan "data:image/"
//           return img.startsWith("data:image/");
//         },
//         {
//           message: "Each image must be a valid base64 string",
//         }
//       )
//     )
//     .nonempty("At least one image is required"),
// });

router.get("/", getUpdates);
router.get("/:id");
router.post("/send", sendMessage);
router.post("/sendata", handleTelegramWebhook);

// router.post("/", validateData(createBlogSchema), createBlog);
router.delete("/");

export default router;
