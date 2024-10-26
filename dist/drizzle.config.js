import { defineConfig } from "drizzle-kit";
export default defineConfig({
    out: "./drizzle",
    schema: ["./src/db/projectSchema.ts", "./src/db/userSchema.ts"],
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});