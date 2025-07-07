"use client";

import { useRouter } from "next/navigation";

export default function EditIDCardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 px-4 py-4 text-white relative">
      <button
        onClick={() => router.push("/profile")}
        className="absolute top-4 left-4 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer font-semibold"
      >
        ← Back
      </button>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Edit ID Card</h1>
          <p className="mt-2 text-blue-100">This is the Edit page layout</p>
        </div>
      </div>
    </div>
  );
}
