import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { streamUpload } from "../utils/cloudinaryUpload";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/authMiddleware";
import { success } from "zod";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";

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
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists ",
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
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      imageUrl,
      publicImageId,
      verificationToken,
      isVerified: false,
    });

    const verifyUrl = `http://localhost:5173/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify your account",
      `<a href="${verifyUrl}" 
       style="
         display:inline-block;
         padding:10px 20px;
         background-color:#4CAF50;
         color:white;
         text-decoration:none;
         border-radius:5px;
         font-weight:bold;
       ">
       Verify Email
    </a>

    <p>If the button doesn't work, use this link:</p>
    <p>${verifyUrl}</p>`,
    );

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

export const myProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    console.log("USER", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const temporaryPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tempPassword = "Temp1234@";

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ success: true, temporaryPassword: tempPassword });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    user.isVerified = true;
    await user.save();
    return res.json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email doesn't exist" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset your password",
      `
    <h2>Reset your password</h2>
    <p>Click the button below to reset your password:</p>

    <a href="${resetUrl}" 
       style="
         display:inline-block;
         padding:10px 20px;
         background-color:#4CAF50;
         color:white;
         text-decoration:none;
         border-radius:5px;
         font-weight:bold;
       ">
      Reset Password
    </a>

    <p>If the button doesn't work, use this link:</p>
    <p>${resetUrl}</p>
  `,
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const { password } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
