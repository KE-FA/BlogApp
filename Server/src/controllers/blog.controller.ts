import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const client = new PrismaClient();

//Create a blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, synopsis, imageUrl } = req.body;
    const { id } = req.user;
    await client.blog.create({
      data: { title, content, synopsis, imageUrl, userid: id },
    });
    res.status(201).json({ message: "New Blog Created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//  Get All blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await client.blog.findMany({
      include: {
        users: true,
      },
    });

    // console.log(blogs)
    res.status(200).json(blogs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Delete a Blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    await client.blog.update({
      where: { blogId },
      data: { isDeleted: true },
    });
    res.status(200).json({ message: "Blog Deleted Successfuly" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Get Blog
export const getBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { id } = req.user;
    const blog = await client.blog.findFirst({
      where: {
        AND: [{ blogId: blogId }, { userid: id }, { isDeleted: false }],
      },
    });
    if (!blog) {
      res.status(404).json({ message: "Blog not found or deleted" });
      return;
    }
    res.status(200).json(blog);
  } catch (e) {
    res.status(500).json({ message: "Sonething Went Wrong" });
  }
};

//Update Blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { title, synopsis, content } = req.body;
    await client.blog.update({
      where: { blogId: blogId },
      data: {
        title: title && title,
        synopsis: synopsis && synopsis,
        content: content && content,
      },
    });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Sonething Went Wrong" });
  }
};

// GET Blog by id
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    const blog = await client.blog.findUnique({
      where: { blogId: blogId },
    });

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res.status(200).json(blog);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
