import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { streamUpload } from "../utils/cloudinaryUpload";
import jwt from "jsonwebtoken";

type RegisterBody = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
};
type LoginBody = {
  email: string;
  password: string;
};

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) => {
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

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      sameSite: "lax",
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const userResponse = existingUser.toObject();

    const { password: _, ...safeUser } = userResponse;
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
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

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
