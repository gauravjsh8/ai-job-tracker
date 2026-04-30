import { NextFunction, Response, Request } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; role: "user" | "admin"; email: string };
}
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    req.user = { id: user._id.toString(), role: user.role, email: user.email };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token not valid" });
  }
};
