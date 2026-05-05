import express from "express";
import { getNextSteps } from "../controllers/aiController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const aiRouter = express.Router();

aiRouter.post("/create-job", authMiddleware, getNextSteps);
