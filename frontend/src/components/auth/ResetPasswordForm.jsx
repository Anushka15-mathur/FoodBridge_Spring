import { useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";

import { Button } from "../ui/button";

import { resetPasswordSchema } from "../../validation/forgotPasswordSchema";

import authService from "../../services/authService";

export default function ResetPasswordForm({
  email,
  otp,
  setStep,
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {

    setLoading(true);

    try {

      await authService.resetPassword(
        email,
        otp,
        data.password
      );

      toast.success("Password updated successfully.");

      setStep(4);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to reset password."
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
        title="Create New Password"
        subtitle="Choose a strong password for your account."
      />

      <div className="space-y-2">

        <label className="text-sm font-medium">
          New Password
        </label>

        <PasswordInput
          placeholder="Enter new password"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

      </div>

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Confirm Password
        </label>

        <PasswordInput
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Updating Password..."
          : "Reset Password"}
      </Button>

      <div className="text-center text-sm">

        <Link
          to="/login"
          className="font-medium text-primary hover:underline"
        >
          Back to Login
        </Link>

      </div>

    </form>
  );
}