import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";

import AuthHeader from "./AuthHeader";
import OtpInput from "./OtpInput";
import ResendOtp from "./ResendOtp";

import { otpSchema } from "../../validation/forgotPasswordSchema";

export default function OtpVerification({
    email,
    setStep,
}) {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            console.log(data);

            // await authService.verifyOtp(email, data.otp);

            setStep(3);

            // toast.success("OTP Verified");
        } catch (error) {
            // toast.error("Invalid OTP");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            // await authService.resendOtp(email);

            console.log("OTP Resent");

            // toast.success("OTP Sent Again");
        } catch (error) {
            console.error(error);

            // toast.error("Unable to resend OTP");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <AuthHeader
                title="Verify OTP"
                subtitle={`Enter the OTP sent to ${email}`}
            />

            <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                    <OtpInput
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.otp}
                        disabled={loading}
                    />
                )}
            />

            {errors.otp && (
                <p className="text-sm text-red-500 text-center">
                    {errors.otp.message}
                </p>
            )}

            <ResendOtp
                onResend={handleResend}
            />

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? "Verifying..." : "Verify OTP"}
            </Button>
        </form>
    );
}