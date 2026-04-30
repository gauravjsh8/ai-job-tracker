import express from "express";
import { upload } from "../middlewares/multer";
import { registerUser } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
