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
  status?: StatusType;
  jobLink?: string;
};

type StatusType = "applied" | "interview" | "offer" | "rejected";

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
    const { status, search, page = "1", limit = "5", sort } = req.query;

    const filter: any = { user };

    if (status && typeof status == "string") {
      filter.status = status;
    }
    if (search && typeof search == "string") {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        {
          company: { $regex: search, $options: "i" },
        },
      ];
    }
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // const jobs = await Job.find({ user }).sort({ createdAt: -1 });
    // return res.status(200).json({ success: true, count: jobs.length, jobs });

    let sortOption = {};
    if (sort === "latest") {
      sortOption = { createdAt: -1 };
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "salary-high") {
      sortOption = { salary: -1 };
    } else if (sort === "salary-low") {
      sortOption = { salary: 1 };
    } else {
      sortOption = { createdAt: -1 };
    }
    const jobs = await Job.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const total = await Job.countDocuments(filter);
    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      jobs,
    });
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

export const jobStats = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user?.id;
    if (!user) {
      return res.status(401).json({ success: false, message: "Not Logged in" });
    }

    const stats = await Job.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(user) } },
      {
        $group: { _id: "$status", count: { $sum: 1 } },
      },
    ]);

    const result = {
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    stats.forEach((item: { _id: StatusType; count: number }) => {
      result[item._id] = item.count;
    });

    return res.status(200).json({ success: true, stats: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const monthlyStats = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user?.id;
    if (!user) {
      return res.status(401).json({ success: false, message: "Not Logged in" });
    }

    const stats = await Job.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(user) } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": -1, "_id.year": -1 } },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formatted = stats.map((item: any) => ({
      month: `${months[item._id.month - 1]} ${item._id.year}`,
      count: item.count,
    }));
    return res.status(200).json({
      success: true,
      stats: formatted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
