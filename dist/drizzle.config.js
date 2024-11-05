import { defineConfig } from "drizzle-kit";
export default defineConfig({
    out: "./drizzle",
    schema: [
        "./src/db/projectSchema.ts",
        "./src/db/userSchema.ts",
        "./src/db/blogSchema.ts",
        "./src/db/disscusSchema.ts",
        "./src/db/taskSchema.ts",
        "./src/db/commentSchema.ts",
        "./src/db/botTelegram.ts",
    ],
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
