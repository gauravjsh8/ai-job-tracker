import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must me minimum 8 characters")
      .max(20, "Password must not be longer than 20 characters")
      .regex(/[A-Z]/, "Must include 1 capital letter")
      .regex(/[0-9]/, "Must include 1 number"),
    confirmPassword: z.string().min(8, "Password must me minimum 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});
