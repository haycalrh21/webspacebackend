import express, { json, urlencoded } from "express";
import projectRouter from "./routes/management/project/index.js";
import authRouter from "./routes/auth/index.js";
import cors from "cors";
const app = express();
app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(json({ limit: "50mb" }));
// routes
app.use("/project", projectRouter);
app.use("/auth", authRouter);
app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
