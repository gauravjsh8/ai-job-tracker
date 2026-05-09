import express from "express";
import {
  aiInterviewQuestions,
  getEmailContent,
  getNextSteps,
} from "../controllers/aiController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const aiRouter = express.Router();

aiRouter.post("/next-steps", authMiddleware, getNextSteps);
aiRouter.post("/ai-email", authMiddleware, getEmailContent);
aiRouter.post("/ai-interview", authMiddleware, aiInterviewQuestions);
