import { Request, Response, NextFunction } from "express";
import zxcvbn from "zxcvbn";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, userName, emailAddress, password } = req.body;

  // Check for required fields
  if (!firstName || !lastName || !userName || !emailAddress || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for existing username
    const userWithUsername = await client.users.findFirst({
      where: { userName },
    });
    if (userWithUsername) {
      res.status(400).json({ message: "Username already in use" });
    }

    // Check for existing email address
    const userWithEmailAddress = await client.users.findFirst({
      where: { emailAddress },
    });
    if (userWithEmailAddress) {
      res.status(400).json({ message: "Email address already in use" });
    }

    // Check password strength
    const result = zxcvbn(password);
    if (result.score < 3) {
      res.status(400).json({ message: "Use a stronger password" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyUser;
