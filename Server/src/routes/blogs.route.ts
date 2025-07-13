import { Router } from "express";
import {
  createBlog,
  getBlogs,
  deleteBlog,
  getBlog,
  updateBlog,
  getBlogById,
} from "../controllers/blog.controller";
import verifyUser from "../middlewares/verifyuser";

import validateTask from "../middlewares/validateBlog";

const router: Router = Router();

router.post("/", verifyUser, validateTask, createBlog);
router.get("/", verifyUser, getBlogs);

router.get("/:blogId", verifyUser, getBlog);
router.patch("/:blogId", verifyUser, updateBlog);
router.delete("/:blogId", verifyUser, deleteBlog);
router.get("/blog/:blogId", verifyUser, getBlogById);

export default router;
