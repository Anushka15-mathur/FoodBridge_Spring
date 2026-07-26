import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),

    lastName: z.string().min(2, "Last name is required"),

    email: z
      .string()
      .email("Please enter a valid email"),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid phone number"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),

    role: z.string().min(1, "Please select a role"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );