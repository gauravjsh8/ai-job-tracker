import express from "express";
import { upload } from "../middlewares/multer";
import {
  login,
  logout,
  myProfile,
  registerUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { loginSchema, registerSchema } from "../validators/userValidation";

export const userRouter = express.Router();

userRouter.post(
  "/register",
  validate(registerSchema),
  upload.single("image"),
  registerUser,
);
userRouter.post("/login", validate(loginSchema), login);
userRouter.get("/logout", authMiddleware, logout);
userRouter.get("/my-profile", myProfile);
