import { useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import AuthHeader from "./AuthHeader";

import { emailSchema } from "../../validation/forgotPasswordSchema";
import authService from "../../services/authService";

export default function ForgotPasswordEmail({
    setStep,
    setEmail,
}) {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {

        setLoading(true);

        try {

            await authService.sendOtp(data.email);

            setEmail(data.email);

            toast.success("OTP sent successfully.");

            setStep(2);

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Unable to send OTP."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >

            <AuthHeader
                title="Forgot Password"
                subtitle="Enter your registered email address to receive an OTP."
            />

            <div className="space-y-2">

                <label className="text-sm font-medium">
                    Email Address
                </label>

                <div className="relative">

                    <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />

                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        {...register("email")}
                    />

                </div>

                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}

            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? "Sending OTP..." : "Send OTP"}
            </Button>

            <div className="text-center text-sm">

                Remember your password?{" "}

                <Link
                    to="/login"
                    className="font-semibold text-primary hover:underline"
                >
                    Back to Login
                </Link>

            </div>

        </form>
    );
}