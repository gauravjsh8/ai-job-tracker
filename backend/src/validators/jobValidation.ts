import z from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  salary: z.number().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  status: z.string(),
  jobLink: z.url("Invalid url").optional(),
});
