import express from "express";
import { validate } from "../middlewares/validateMiddleware";
import { jobSchema } from "../validators/jobValidation";
import {
  createJob,
  deleteJob,
  getJobs,
  getSingleJob,
  jobStats,
  monthlyStats,
  updateJob,
} from "../controllers/jobController";
import {
  authMiddleware,
  checkJobownership,
} from "../middlewares/authMiddleware";

export const jobRouter = express.Router();

jobRouter.post("/create-job", validate(jobSchema), authMiddleware, createJob);

jobRouter.get("/all-jobs", authMiddleware, getJobs);

jobRouter.get(
  "/get-single-job/:jobId",
  authMiddleware,
  checkJobownership,
  getSingleJob,
);

jobRouter.get("/stats", authMiddleware, jobStats);

jobRouter.get("/monthly-stats", authMiddleware, monthlyStats);

jobRouter.patch(
  "/:jobId",
  authMiddleware,
  checkJobownership,
  validate(jobSchema),
  updateJob,
);

jobRouter.delete("/:jobId", authMiddleware, checkJobownership, deleteJob);
