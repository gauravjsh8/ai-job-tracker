import express from "express";
import { upload } from "../middlewares/multer";
import { login, registerUser } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", login);
