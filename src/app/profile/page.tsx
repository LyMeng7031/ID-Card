"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import DigitalIDCardStyle1 from "../components/DigitalIDCardStyle1";
import DigitalIDCardStyle2 from "../components/DigitalIDCardStyle2";
import DigitalIDCardStyle3 from "../components/DigitalIDCardStyle3";
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
  };

  const toggleStyle = () => {
    setFade(true);
    setTimeout(() => {
      setStyleIndex((prev) => (prev % 3) + 1);
      setFade(false);
    }, 300);
  };

  const renderCardStyle = () => {
    switch (styleIndex) {
      case 1:
        return <DigitalIDCardStyle1 cardData={cardData} />;
      case 2:
        return <DigitalIDCardStyle2 cardData={cardData} />;
      case 3:
        return <DigitalIDCardStyle3 cardData={cardData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-4 py-4 relative text-white">
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="relative bg-gradient-to-tr from-white via-zinc-100 backdrop-blur-md text-gray-800 shadow-xl rounded-3xl p-8 w-full max-w-sm text-center transition-all duration-300">
          {/* Logout Button */}
          <button
            onClick={() => router.push("/login")}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-200 cursor-pointer"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>

          {/* Avatar */}
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=MC"
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-600 mb-4 shadow-md"
          />

          {/* User Info */}
          <h2 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            {user.fullName}
          </h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => router.push("/create-id")}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow cursor-pointer"
            >
              Create ID Card
            </button>
            <button
              onClick={() => router.push("/edit-id")}
              className="w-full bg-blue-400 text-white py-2.5 rounded-xl hover:bg-blue-500 transition-all font-semibold shadow cursor-pointer"
            >
              Edit Card
            </button>
            <button
              onClick={() => router.push(`/view-id?style=${styleIndex}`)}
              className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition-all font-semibold shadow cursor-pointer"
            >
              View ID Card
            </button>
            <button
              onClick={toggleStyle}
              className="w-full bg-purple-500 text-white py-2.5 rounded-xl hover:bg-purple-600 transition-all font-semibold shadow cursor-pointer"
            >
              Change Style
            </button>
            <button
              onClick={() => router.push("/all-id-cards")}
              className="w-full bg-gray-800 text-white py-2.5 rounded-xl hover:bg-gray-900 transition-all font-semibold shadow cursor-pointer"
            >
              See All ID Cards
            </button>
          </div>
        </div>
      </div>

      {/* Style name + Animated Card Style */}
      <div className="flex flex-col items-center mt-8 transition-all duration-300">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          {styleNames[styleIndex.toString()]}
        </p>

        <div
          className={`transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {renderCardStyle()}
        </div>
      </div>
    </div>
  );
}
