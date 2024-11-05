import { db } from "../../../db/index.js";
import { v2 as cloudinary } from "cloudinary";
import { eq } from "drizzle-orm";
import { blogTable } from "../../../db/blogSchema.js";
import { userTable } from "../../../db/userSchema.js";
// Konfigurasi Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function createBlog(req, res) {
    try {
        const { title, images, description, category, userId } = req.body;
        if (!images ||
            !Array.isArray(images) ||
            images.some((img) => !img.startsWith("data:image"))) {
            res.status(400).json({ error: "Valid base64 images are required" });
            return;
        }
        // Upload setiap gambar ke Cloudinary
        const imageUrls = await Promise.all(images.map(async (image) => {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "projects",
            });
            return uploadResponse.secure_url;
        }));
        // Simpan project dengan URL gambar yang sudah di-upload
        const project = await db
            .insert(blogTable)
            .values({
            userId,
            title,
            imageUrls,
            description,
            category,
        })
            .returning();
        res.status(201).json({
            message: "Project created successfully",
            project,
            imageUrls,
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
}
export function getBlog(req, res) {
    db.select({
        blogId: blogTable.id,
        title: blogTable.title,
        category: blogTable.category,
        imageUrls: blogTable.imageUrls,
        content: blogTable.description,
        userId: userTable.id, // Mengambil userId dari tabel user
        username: userTable.name, // Contoh kolom lain dari tabel user
    })
        .from(blogTable)
        .innerJoin(userTable, eq(blogTable.userId, userTable.id)) // Join berdasarkan relasi userId
        .then((blogs) => {
        res.json(blogs);
    })
        .catch((error) => {
        console.error(error);
        res.status(500).send({
            error: "An error occurred while fetching projects",
        });
    });
}
export async function deleteBlogPost(req, res) {
    const { id } = req.params;
    try {
        // Pastikan ID valid sebelum melakukan penghapusan
        if (!id) {
            return res.status(400).json({ message: "ID tidak valid" });
        }
        // Menghapus blog berdasarkan ID
        const result = await db
            .delete(blogTable)
            .where(eq(blogTable.id, Number(id)));
        // Mengembalikan respon sukses
        return res.status(200).json({ message: "Blog berhasil dihapus" });
    }
    catch (error) {
        console.error("Error deleting blog post:", error);
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
}
// export async function getProjectById(req: Request, res: Response) {
//   const { id } = req.params;
//   const [project] = await db
//     .select()
//     .from(projectTable)
//     .where(eq(projectTable.id, Number(id)));
//   if (project) {
//     res.json(project);
//   } else {
//     res.status(404).send({ message: "Project was not found" });
//   }
// }
// export function deleteProject(req: Request, res: Response) {
//   res.send("delete project");
// }
