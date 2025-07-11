"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut, FiMail, FiUser, FiArrowLeft } from "react-icons/fi";

export default function EditProfilePage() {
  const router = useRouter();

  // Initial user data (can be replaced with API data)
  const [fullName, setFullName] = useState("Makara Chantha");
  const [username, setUsername] = useState("makara123");
  const [email, setEmail] = useState("makara@example.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Call your update API here if needed
    // For now, just redirect back
    router.push("/profile");
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center justify-center p-6">
        <div className="relative rounded-3xl shadow-xl max-w-sm w-full p-8 text-center">
          {/* Back Button */}
          <div className="absolute top-5 right-5 flex gap-4">
            <button
              onClick={() => router.push("/profile")}
              title="Back to Profile"
              className="text-gray-500 hover:text-blue-600 transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              <FiArrowLeft size={22} />
            </button>

            <button
              onClick={() => router.push("/login")}
              title="Logout"
              className="text-gray-400 hover:text-red-500 transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              <FiLogOut size={22} />
            </button>
          </div>

          {/* Avatar */}
          <div>
            <div className="relative mx-auto w-28 h-28 mb-6">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 blur-2xl opacity-70 float-animation"
                style={{ filter: "blur(30px)" }}
              />
              <img
                src="https://api.dicebear.com/7.x/initials/svg?seed=MC"
                alt="Profile Avatar"
                className="relative w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg float-animation"
              />
            </div>
          </div>

          {/* Edit Profile Form */}
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
            Edit Profile
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-left text-sm">
            <div>
              <label className="text-gray-600 font-semibold block mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl border px-4 py-2 shadow-inner"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 font-semibold block mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full rounded-xl border px-4 py-2 shadow-inner"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 font-semibold block mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border px-4 py-2 shadow-inner"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-2xl font-semibold shadow-md bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:scale-105 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
