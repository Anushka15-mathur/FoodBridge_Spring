import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import AuthHeader from "../auth/AuthHeader";
import PasswordInput from "../auth/PasswordInput";

import { loginSchema } from "../../validation/authSchema";
import { getRoleDashboardPath } from "../../utils/roleRedirect";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      if (!response.token) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      const { user } = response;
      if (["RESTAURANT", "VOLUNTEER"].includes(user?.role) && !user.profileCompleted) {
        navigate("/additional-info", { replace: true, state: { role: user.role } });
      } else {
        navigate(getRoleDashboardPath(user?.role), { replace: true });
      }

    } catch (error) {

      const message =
        error.response?.data?.message ||
        "Login failed. Please try again.";

      toast.error(message);

      console.error(error);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-6">

        <AuthHeader
          title="Welcome Back 👋"
          subtitle="Sign in to continue to FoodBridge"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Email */}

          <div>
            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <PasswordInput
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me */}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register("rememberMe")}
              />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

        </form>

        <p className="text-center text-sm">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>

        </p>

      </CardContent>
    </Card>
  );
}
