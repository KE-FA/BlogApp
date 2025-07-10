import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, emailAddress, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.users.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "user created successfully" });
    // console.log(firstName,userName)
    // res.send("Register a new user")
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

