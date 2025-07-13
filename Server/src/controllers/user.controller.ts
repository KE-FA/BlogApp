import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

//Update User Info
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, emailAddress } = req.body;
    const { id } = req.user;

    await client.users.update({
      where: { id: id },
      data: { firstName, lastName, userName, emailAddress },
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Change Password
export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const { id } = req.user;

    const user = await client.users.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res
        .status(200)
        .json({ success: false, message: "Incorrect current password" });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await client.users.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
