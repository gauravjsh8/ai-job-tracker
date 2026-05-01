import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import Job from "../models/jobModel";
import mongoose from "mongoose";

type jobBody = {
  title: string;
  company: string;
  salary?: number;
  location?: string;
  notes?: string;
  status?: "applied" | "interview" | "offer" | "rejected";
  jobLink?: string;
};
export const createJob = async (
  req: AuthRequest & { body: jobBody },
  res: Response,
) => {
  try {
    const { title, company, salary, location, notes, status, jobLink } =
      req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not Logged in" });
    }

    const job = await Job.create({
      title,
      salary,
      company,
      location,
      notes,
      status,
      jobLink,
      user: userId,
    });
    return res
      .status(201)
      .json({ success: true, message: "Job created successfully", job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getJobs = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user?.id;

    if (!user) {
      return res.status(401).json({ success: false, message: "Not Logged in" });
    }

    const jobs = await Job.find({ user }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleJob = async (req: AuthRequest, res: Response) => {
  try {
    const jobId = req.params.jobId;

    if (
      !jobId ||
      typeof jobId !== "string" ||
      !mongoose.Types.ObjectId.isValid(jobId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID format",
      });
    }
    const user = req.user?.id;

    if (!user) {
      return res.status(401).json({ success: false, message: "Not Logged in" });
    }

    const job = await Job.findOne({ _id: jobId, user }).populate(
      "user",
      "firstName lastName",
    );
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or unauthorized" });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateJob = async (
  req: AuthRequest & { body: jobBody },
  res: Response,
) => {
  try {
    const jobId = req.params.jobId;
    const { title, company, salary, location, notes, status, jobLink } =
      req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not Logged in" });
    }

    if (
      !jobId ||
      typeof jobId !== "string" ||
      !mongoose.Types.ObjectId.isValid(jobId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job ID format" });
    }
    const job = await Job.findOne({ _id: jobId, user: userId });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (title !== undefined) job.title = title;
    if (company !== undefined) job.company = company;
    if (salary !== undefined) job.salary = salary;
    if (location !== undefined) job.location = location;
    if (notes !== undefined) job.notes = notes;
    if (status !== undefined) job.status = status;
    if (jobLink !== undefined) job.jobLink = jobLink;

    await job.save();
    return res
      .status(200)
      .json({ success: true, message: "Job updated successfully", job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const jobId = req.params.jobId;

    if (
      !jobId ||
      typeof jobId !== "string" ||
      !mongoose.Types.ObjectId.isValid(jobId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID format",
      });
    }
    const user = req.user?.id;

    if (!user) {
      return res.status(401).json({ success: false, message: "Not Logged in" });
    }

    const job = await Job.findOne({ _id: jobId, user });
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or unauthorized" });
    }

    await job.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
