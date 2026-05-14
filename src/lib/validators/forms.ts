import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  need: z.string().min(1, "Please select what you need"),
  details: z.string().min(10, "Please provide a bit more detail (at least 10 characters)").max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const careersSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid Portfolio URL").optional().or(z.literal("")),
  role: z.string().min(1, "Please select a role"),
  yearsExperience: z.string().min(1, "Please select your experience"),
  availability: z.string().min(1, "Please select your availability"),
  compensation: z.string().optional(),
  skills: z.string().min(2, "Please list your key skills"),
  about: z.string().min(20, "Tell us more about yourself (at least 20 characters)").max(3000),
  coverMessage: z.string().max(1000).optional(),
  consent: z.boolean().refine((v) => v === true, "You must consent to proceed"),
  resume_url: z.string().url("Please upload your resume first"),
});

export type CareersFormData = z.infer<typeof careersSchema>;
