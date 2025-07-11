"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut, FiMail, FiUser, FiEdit } from "react-icons/fi";
import DigitalIDCardStyle1 from "../all-id-cards/components/DigitalIDCardStyle1";
import DigitalIDCardStyle2 from "../all-id-cards/components/DigitalIDCardStyle2";
import DigitalIDCardStyle3 from "../all-id-cards/components/DigitalIDCardStyle3";
import DigitalIDCardSuperCute from "../all-id-cards/components/DigitalIDCardSuperCute";
import cardData from "../data/cardData";

export default function ProfilePage() {
  const router = useRouter();
  const [styleIndex, setStyleIndex] = useState(1);
  const [fade, setFade] = useState(false);

  const user = {
    fullName: "Makara Chantha",
    username: "makara123",
    email: "makara@example.com",
  };

  const styleNames: { [key: string]: string } = {
    "1": "Classic Style",
    "2": "Modern Style",
    "3": "Minimal Style",
    "4": "Cute Style 🐾",
  };

  const toggleStyle = () => {
    setFade(true);
    setTimeout(() => {
      setStyleIndex((prev) => (prev % 4) + 1);
      setFade(false);
    }, 300);
  };

  const buttonBase =
    "w-full py-3 rounded-2xl font-semibold shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:brightness-110";

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
          {/* Edit Profile & Logout Icons */}
          <div className="absolute top-5 right-5 flex gap-4">
            <button
              onClick={() => router.push("/edit-profile")}
              title="Edit Profile"
              className="text-gray-500 hover:text-green-600 transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              <FiEdit size={22} />
            </button>

            <button
              onClick={() => router.push("/login")}
              title="Logout"
              className="text-gray-400 hover:text-red-500 transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              <FiLogOut size={22} />
            </button>
          </div>

          {/* Avatar with Gradient Glow */}
          <div className="relative mx-auto w-28 h-28 mb-6">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 blur-2xl opacity-70 float-animation"
              style={{ filter: "blur(30px)" }}
            />
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=MC"
              alt="Profile Avatar"
              className="relative w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg float-animation"
            />
          </div>

          {/* Full Name */}
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
            {user.fullName}
          </h2>

          {/* User Info Table */}
          <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-xl shadow-inner p-4 text-left text-sm space-y-2">
            <div className="flex items-center gap-2 text-gray-800 font-medium">
              <FiUser className="text-green-600" />
              <span>@{user.username}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FiMail className="text-green-600" />
              <span>{user.email}</span>
            </div>
          </div>

          {/* Action Buttons with Green Gradient */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => router.push("/create-id")}
              className={`${buttonBase} bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-400`}
            >
              Create ID Card
            </button>

            <button
              onClick={toggleStyle}
              className={`${buttonBase} bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-400`}
            >
              Change Style
            </button>

            <button
              onClick={() => router.push("/all-id-cards")}
              className={`${buttonBase} bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-400`}
            >
              See All ID Cards
            </button>
          </div>
        </div>

        {/* Card Preview with Fade */}
        <div className="flex flex-col items-center mt-12 transition-opacity duration-300">
          <p className="text-xl font-semibold text-gray-900 mb-3">
            {styleNames[styleIndex.toString()]}
          </p>

          <div
            className={`transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {(() => {
              switch (styleIndex) {
                case 1:
                  return <DigitalIDCardStyle1 cardData={cardData} />;
                case 2:
                  return <DigitalIDCardStyle2 cardData={cardData} />;
                case 3:
                  return <DigitalIDCardStyle3 cardData={cardData} />;
                case 4:
                  return <DigitalIDCardSuperCute cardData={cardData} />;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
