"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 px-4 flex items-center justify-center text-white">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Create Account</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
}