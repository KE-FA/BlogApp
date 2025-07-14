import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route";
import blogRoutes from "./routes/blogs.route";
import userRoutes from "./routes/user.route";

const app: Express = express();

app.use(
  cors({
    origin: "https://blog-app-rose-xi.vercel.app/",
    credentials: true,
    
    methods:["POST", "GET", "PUT", "PATCH", "DELETE"]
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Welcome to the blog App");
});

//Routes
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
