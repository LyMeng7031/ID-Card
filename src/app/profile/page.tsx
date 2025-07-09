"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import DigitalIDCardStyle1 from "../components/DigitalIDCardStyle1";
import DigitalIDCardStyle2 from "../components/DigitalIDCardStyle2";
import DigitalIDCardStyle3 from "../components/DigitalIDCardStyle3";
import DigitalIDCardSuperCute from "../components/DigitalIDCardSuperCute"; // <-- import cute style
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
      setStyleIndex((prev) => (prev % 4) + 1); // cycle through 4 styles now
      setFade(false);
    }, 300);
  };

  const buttonBase =
    "w-full py-2.5 rounded-xl font-semibold shadow cursor-pointer transition-all duration-300 transform hover:scale-105 hover:brightness-110";

  return (
    <div className="min-h-screen px-4 py-4 relative bg-gradient-to-tr from-white via-zinc-100 to-zinc-200 text-gray-800 transition-colors duration-500">
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

          {/* Blue Gradient Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => router.push("/create-id")}
              className={`${buttonBase} bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white`}
            >
              Create ID Card
            </button>
            <button
              onClick={() => router.push("/edit-id")}
              className={`${buttonBase} bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white`}
            >
              Edit Card
            </button>
            <button
              onClick={() => router.push(`/view-id?style=${styleIndex}`)}
              className={`${buttonBase} bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white`}
            >
              View ID Card
            </button>
            <button
              onClick={toggleStyle}
              className={`${buttonBase} bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white`}
            >
              Change Style
            </button>
            <button
              onClick={() => router.push("/all-id-cards")}
              className={`${buttonBase} bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white`}
            >
              See All ID Cards
            </button>
          </div>
        </div>
      </div>

      {/* Style name + Card View */}
      <div className="flex flex-col items-center mt-8 transition-all duration-300">
        <p className="text-lg font-semibold text-gray-900 mb-2">
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
                return <DigitalIDCardSuperCute cardData={cardData} />; // render cute card
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
