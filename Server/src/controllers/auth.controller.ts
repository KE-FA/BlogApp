import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

//Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    // console.log(identifier, password)

    const user = await client.users.findFirst({
      where: {
        OR: [{ userName: identifier }, { emailAddress: identifier }],
      },
    });

    if (!user) {
      res.status(400).json({ message: "Wrong Login Credentials" });
      return;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      res.status(400).json({ message: "Wrong Login Credentials" });
      return;
    }

    //Create jwt token
    const { password: userPassword, ...userDetails } = user;
    const token = jwt.sign(userDetails, process.env.JWT_SECRET!);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .status(200)
    .json(userDetails);
    // res.send("Logging the user in");
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
