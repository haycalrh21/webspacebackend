import express, { json, urlencoded } from "express";
import projectRouter from "./routes/management/project/index.js";
import authRouter from "./routes/auth/index.js";
import botRouter from "./routes/bot/index.js";
import blogRouter from "./routes/discuss/blog/index.js";
import tasksRouter from "./routes/tasks/index.js";
import discussRouter from "./routes/discuss/discussion/index.js";
import commentRouter from "./routes/discuss/discussion/comment/index.js";
import cors from "cors";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";

const port = 4000;
const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: false, limit: "50mb" }));
app.use(json({ limit: "50mb" }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://webspacefrontend.vercel.app",
];

// Middleware CORS yang diperbarui
app.use(
  cors({
    origin: allowedOrigins, // Menentukan origin yang diizinkan
    credentials: true, // Mengizinkan cookies
  })
);

// Middleware untuk memvalidasi origin secara manual
const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  const appOrigin = req.headers["x-app-origin"]; // Header kustom untuk React Native

  console.log("Origin:", origin, "App Origin:", appOrigin);

  if (
    allowedOrigins.includes(origin ?? "") || // Memeriksa jika origin termasuk yang diizinkan
    appOrigin === "react-native-app" // Pengecekan untuk React Native
  ) {
    next();
  } else {
    res.status(403).send("Origin not allowed");
  }
};

// Route configuration
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/project", checkOrigin, projectRouter);
app.use("/auth", checkOrigin, authRouter);
app.use("/blog", checkOrigin, blogRouter);
app.use("/bot", checkOrigin, botRouter);
app.use("/discuss", checkOrigin, discussRouter);
app.use("/comment", checkOrigin, commentRouter);
app.use("/tasks", checkOrigin, tasksRouter);

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
