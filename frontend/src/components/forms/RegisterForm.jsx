import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import authService from "../../services/authService";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import AuthHeader from "../auth/AuthHeader";
import PasswordInput from "../auth/PasswordInput";
import RoleSelector from "../auth/RoleSelector";

import { registerSchema } from "../../validation/authSchema";

export default function RegisterForm() {

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

 const onSubmit = async (data) => {

    try {

        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: data.role,
        };

        const response = await authService.register(payload);

        toast.success(response.message);

        navigate("/additional-info", {
            state: {
                email: data.email,
                role: data.role,
            },
        });

    } catch (error) {

        const message =
            error.response?.data?.message ||
            "Registration failed. Please try again.";

        toast.error(message);

        console.error(error);
    }
};

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-5 py-6">

        <AuthHeader
          title="Create Account"
          subtitle="Start your FoodBridge journey"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          {/* First Name & Last Name */}

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium text-heading">
                First Name
              </label>

              <Input
                placeholder="John"
                {...register("firstName")}
              />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-heading">
                Last Name
              </label>

              <Input
                placeholder="Doe"
                {...register("lastName")}
              />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block font-medium text-heading">
              Email
            </label>

            <Input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block font-medium text-heading">
              Phone Number
            </label>

            <Input
              placeholder="9876543210"
              {...register("phone")}
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block font-medium text-heading">
              Password
            </label>

            <PasswordInput
              placeholder="Create a password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block font-medium text-heading">
              Confirm Password
            </label>

            <PasswordInput
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Role */}

          <div>
            <label className="mb-3 block font-medium text-heading">
              Select Your Role
            </label>

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RoleSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {errors.role && (
              <p className="mt-2 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Submit */}

          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </Button>

        </form>

        <p className="text-center text-sm">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>

        </p>

      </CardContent>
    </Card>
  );
}