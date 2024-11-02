import express, { json, urlencoded } from "express";
import projectRouter from "./routes/management/project/index.js";
import authRouter from "./routes/auth/index.js";
import botRouter from "./routes/bot/index.js";
import blogRouter from "./routes/discuss/blog/index.js";
import tasksRouter from "./routes/tasks/index.js";
import discussRouter from "./routes/discuss/discussion/index.js";
import cors from "cors";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
const port = 4000;
const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: false, limit: "50mb" }));
// app.use(cors());
const checkOrigin = (req, res, next) => {
    const origin = req.headers.origin;
    const appOrigin = req.headers["x-app-origin"]; // Header kustom untuk React Native
    console.log(origin, appOrigin);
    if (origin === "http://localhost:3000" ||
        origin === "https://webspacefrontend.vercel.app" ||
        appOrigin === "react-native-app" // Menambahkan pengecekan untuk React Native
    ) {
        next(); // Lanjutkan ke rute jika asal valid
    }
    else {
        res.status(403).send("Origin not allowed");
    }
};
app.use(cors({
    credentials: true,
}));
app.use(json({ limit: "50mb" }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// routes
app.use("/project", checkOrigin, projectRouter);
app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/bot", botRouter);
app.use("/discuss", discussRouter);
app.use("/tasks", tasksRouter);
if (process.env.NODE_ENV === "dev") {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
export const handler = serverless(app);
