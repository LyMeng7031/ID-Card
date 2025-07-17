"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthRegisterType } from "@/types/auth-type";
import { authRequest } from "@/lib/api/auth-api";
import { useDeviceStore } from "../store/device-store";

import Image from "next/image";
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
import { Card, CardContent } from "@/components/ui/card";

const RegisterSchema = z.object({
  user_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Register() {
  const router = useRouter();
  const { AUTH_REGISTER } = authRequest();
  const { device, fetchDeviceInfo } = useDeviceStore();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      user_name: "",
      full_name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    fetchDeviceInfo();
  }, [fetchDeviceInfo]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: AuthRegisterType) => AUTH_REGISTER(payload),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      router.push("/profile"); // ✅ Redirect after success
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    mutate({
      ...data,
      device_name: device?.device_name || "Unknown",
      device_type: device?.device_type || "Unknown",
      os: device?.os || "Unknown",
      browser: device?.browser || "Unknown",
      ip_address: device?.ip_address || "Unknown",
      // fingerprint: device?.fingerprint || "Unknown",
      // username: "", // Optional, if used by backend
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center">
      <div className="flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        {/* Left Column - Image */}
        <div className="hidden lg:block lg:w-5/12 relative">
          <Image
            src="https://thumbs.dreamstime.com/b/vertical-collage-portrait-mini-black-white-effect-guy-huge-smart-phone-empty-space-dialogue-bubble-isolated-creative-272274759.jpg"
            alt="Register Visual"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-7/12 p-8">
          <Card className="w-full shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Create an Account!
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="user_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    {isPending ? "Registering..." : "Register"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center space-y-2">
                <p className="text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500 hover:underline">
                    Login!
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
