"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authRequest } from "@/lib/api/auth-api";
import { AuthLoginType } from "@/types/auth-type";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AxiosError } from "axios";

// ✅ Define form validation schema
const LoginSchema = z.object({
  user_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const Login = () => {
  const router = useRouter();
  const { AUTH_LOGIN } = authRequest();

  // ✅ Store specific error messages per field or general
  const [fieldErrors, setFieldErrors] = useState<{
    user_name?: string;
    password?: string;
    general?: string;
  }>({});

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: AuthLoginType) => AUTH_LOGIN(payload),

    onSuccess: (data) => {
      if (data) {
        router.push("/profile");
      }
    },

    // ✅ Handle error based on API error response
    onError: (error: AxiosError) => {
      const message = (error.response?.data as any)?.error;

      if (message === "Invalid username") {
        setFieldErrors({ user_name: "Username is incorrect" });
      } else if (message === "Invalid password") {
        setFieldErrors({ password: "Password is incorrect" });
      } else {
        setFieldErrors({ general: "Something went wrong. Please try again." });
      }
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setFieldErrors({}); // ✅ Clear old errors before new submit
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome 👋
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* ✅ Username field */}
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setFieldErrors({
                          ...fieldErrors,
                          user_name: undefined,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {fieldErrors.user_name && (
                    <p className="text-sm text-red-500">
                      {fieldErrors.user_name}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* ✅ Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setFieldErrors({ ...fieldErrors, password: undefined });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {fieldErrors.password && (
                    <p className="text-sm text-red-500">
                      {fieldErrors.password}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* ✅ General error */}
            {fieldErrors.general && (
              <div className="text-sm text-red-500 text-center">
                {fieldErrors.general}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
