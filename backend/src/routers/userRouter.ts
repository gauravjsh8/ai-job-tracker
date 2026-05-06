import express from "express";
import { upload } from "../middlewares/multer";
import {
  getUsers,
  login,
  logout,
  myProfile,
  registerUser,
  temporaryPassword,
} from "../controllers/userController";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware";
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
userRouter.get("/all-users", authMiddleware, adminMiddleware, getUsers);
userRouter.patch(
  "/temporary-password/:id",
  authMiddleware,
  adminMiddleware,
  temporaryPassword,
);
