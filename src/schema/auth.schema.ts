import { z } from "zod";

export const emailSchema = z.email({ error: "Invalid email" });

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
  .regex(/[0-9]/, "Must contain at least 1 digit")
  .regex(/[^A-Za-z0-9]/, "Must contain at least 1 special character");

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
