import z from "zod";

export const jobSchema = z.object({
  title: z.string(),
  company: z.string(),
  salary: z.number().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  status: z.string(),
  jobLink: z.url("Invalid url").optional(),
});
