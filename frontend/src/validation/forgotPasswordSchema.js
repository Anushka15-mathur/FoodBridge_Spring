import { z } from "zod";

export const emailSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Enter a valid email")
});

export const otpSchema = z.object({
    otp: z
        .string()
        .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain a special character"),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password")
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        path: ["confirmPassword"],
        message: "Passwords do not match"
    }
);