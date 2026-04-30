import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { streamUpload } from "../utils/cloudinaryUpload";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists ",
      });
    }
    if (password !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Password do not match ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl = "";
    let publicImageId = "";

    if (req.file) {
      const result = await streamUpload(req.file.buffer, "users", "image");
      imageUrl = result.secure_url;
      publicImageId = result.public_id;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      imageUrl,
      publicImageId,
    });

    const userResponse = newUser.toObject();
    const { password: _, ...safeUser } = userResponse;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: safeUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
