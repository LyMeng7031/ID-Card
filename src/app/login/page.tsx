"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-muted flex items-center justify-center p-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSChpZEOFk7NTHxODur7vpiLhe39nxe2E3raazcMvyOPR4rCjBB5kkdRgN_ptatgQ1HbLU&usqp=CAU"
          alt="Login Illustration"
          className="w-2/3 max-w-xs rounded-lg shadow-md"
        />
      </div>

      <div className="w-1/2 bg-background flex items-center justify-center px-6">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="text" placeholder="Username" required />
              <Input type="password" placeholder="Password" required />
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 "
              >
                Login
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
