import { Request, Response } from "express";
import { db } from "../../../db/index.js";
import { projectTable } from "../../../db/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProject(req: Request, res: Response) {
  try {
    const { name, images, description, language } = req.body;

    if (
      !images ||
      !Array.isArray(images) ||
      images.some((img) => !img.startsWith("data:image"))
    ) {
      res.status(400).json({ error: "Valid base64 images are required" });
      return;
    }

    // Upload setiap gambar ke Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "projects",
        });
        return uploadResponse.secure_url;
      })
    );

    // Simpan project dengan URL gambar yang sudah di-upload
    const project = await db
      .insert(projectTable)
      .values({
        name,
        imageUrls,
        description,
        language,
      })
      .returning();

    res.status(201).json({
      message: "Project created successfully",
      project,
      imageUrls,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

export function getProject(req: Request, res: Response) {
  db.select()
    .from(projectTable)
    .then((projects) => {
      res.json(projects);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .send({ error: "An error occurred while fetching projects" });
    });
}

export async function getProjectById(req: Request, res: Response) {
  const { id } = req.params;
  const [project] = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.id, Number(id)));
  if (project) {
    res.json(project);
  } else {
    res.status(404).send({ message: "Project was not found" });
  }
}
export function deleteProject(req: Request, res: Response) {
  res.send("delete project");
}
