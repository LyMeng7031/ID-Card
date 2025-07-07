"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const user = {
    fullName: "Makara Chantha",
    username: "makara123",
    email: "makara@example.com",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 px-4 py-4 relative text-white">
      <button
        onClick={() => router.push("/login")}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
      >
        Logout
      </button>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white text-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-sm text-center">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=MC"
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-600 mb-4"
          />
          <h2 className="text-2xl font-bold text-blue-700">{user.fullName}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-gray-600 mt-2">{user.email}</p>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => router.push("/create-id")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Create ID Card
            </button>
            <button
              onClick={() => router.push("/edit-id")}
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition cursor-pointer"
            >
              Edit Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}