"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with image */}
      <div className="w-1/2 bg-gray-300 flex items-center justify-center p-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSChpZEOFk7NTHxODur7vpiLhe39nxe2E3raazcMvyOPR4rCjBB5kkdRgN_ptatgQ1HbLU&usqp=CAU"
          alt="Phone with lock"
          className="max-w-xs w-2/3"
        />
      </div>

      {/* Right side with form */}
      <div className="w-1/2 bg-white flex items-center justify-center px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-gray-800">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Welcome Back
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
