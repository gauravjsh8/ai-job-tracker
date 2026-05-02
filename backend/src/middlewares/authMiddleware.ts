import { NextFunction, Response, Request } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { string } from "zod";
import mongoose from "mongoose";
import Job from "../models/jobModel";

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

export const checkJobownership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user?.id;
    const jobId = req.params.jobId;

    if (!user) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    if (
      !jobId ||
      typeof jobId !== "string" ||
      !mongoose.Types.ObjectId.isValid(jobId)
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid job id" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "job not found" });
    }

    if (job.user.toString() !== user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this job",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
