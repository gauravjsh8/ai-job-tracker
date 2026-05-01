import express from "express";
import { validate } from "../middlewares/validateMiddleware";
import { jobSchema } from "../validators/jobValidation";
import { createJob, getJobs, getSingleJob } from "../controllers/jobController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const jobRouter = express.Router();

jobRouter.post("/create-job", validate(jobSchema), authMiddleware, createJob);
jobRouter.get("/all-jobs", authMiddleware, getJobs);
jobRouter.get("/get-single-job/:jobId", authMiddleware, getSingleJob);
