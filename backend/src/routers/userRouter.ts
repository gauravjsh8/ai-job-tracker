import express from "express";
import { upload } from "../middlewares/multer";
import {
  login,
  logout,
  myProfile,
  registerUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", login);
userRouter.get("/logout", authMiddleware, logout);
userRouter.get("/my-profile", authMiddleware, myProfile);
