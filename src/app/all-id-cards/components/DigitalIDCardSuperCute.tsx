import React from "react";
import {
  FaVenusMars,
  FaBirthdayCake,
  FaFlag,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaw,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi"; // 🆕 Import edit icon
import { useRouter } from "next/navigation"; // 🆕 Import router
import SocialShare from "./SocialShare";

type CardData = {
  id: number;
  user_id: number;
  gender: string;
  dob: string;
  nationality: string;
  phone: string;
  address: string;
  qr_url: string;
  profile_url: string;
  theme_color: string;
  created_at: string;
  updated_at: string;
  pet_name?: string;
  pet_type?: string;
};

export default function DigitalIDCardDarkMode({ cardData }: { cardData: CardData }) {
  const router = useRouter(); // 🆕 Initialize router

  return (
    <div
      className="relative max-w-sm mx-auto bg-zinc-900 rounded-2xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.7)] border border-zinc-700
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)] transition-shadow duration-300 ease-in-out"
      style={{ fontFamily: "'Unica One', sans-serif", color: "#e0e0e0" }}
    >
      {/* 🆕 Edit Icon in Top Right */}
      <button
        onClick={() => router.push("/edit-id")}
        title="Edit Card"
        className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-200 cursor-pointer transition-all duration-200"
      >
        <FiEdit size={20} />
      </button>

      {/* Profile & Header */}
      <div className="flex flex-col items-center space-y-3 mb-6">
        <div
          className="relative w-28 h-28 rounded-full border-8 border-indigo-600 shadow-lg overflow-hidden"
          style={{ boxShadow: "0 0 15px 5px rgba(75,0,130,0.7)" }}
        >
          <img
            src={cardData.profile_url}
            alt="Profile Picture"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 right-0 bg-indigo-700 rounded-full p-1 animate-pulse">
            <FaPaw className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-indigo-400 drop-shadow select-none">
          Dark Mode ID
        </h1>
        <p className="text-indigo-500 text-sm font-semibold select-none">
          User #{cardData.user_id} | ID #{cardData.id}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-3">
        <InfoRow icon={<FaVenusMars />} label="Gender" value={cardData.gender} />
        <InfoRow icon={<FaBirthdayCake />} label="Birthday" value={cardData.dob} />
        <InfoRow icon={<FaFlag />} label="Nationality" value={cardData.nationality} />
        <InfoRow icon={<FaPhoneAlt />} label="Phone" value={cardData.phone} />
        <InfoRow icon={<FaMapMarkerAlt />} label="Address" value={cardData.address} />
        {cardData.pet_name && cardData.pet_type && (
          <InfoRow
            icon={<FaPaw />}
            label="Pet"
            value={`${cardData.pet_name} the ${cardData.pet_type}`}
          />
        )}
      </div>

      {/* Social Share */}
      <div className="mt-5">
        <SocialShare />
      </div>

      {/* QR Code */}
      <div className="mt-6 flex justify-center">
        <img
          src={cardData.qr_url}
          alt="QR Code"
          className="w-24 h-24 rounded-xl border-4 border-indigo-500 shadow-md"
          style={{ boxShadow: "0 0 20px 6px rgba(75,0,130,0.7)" }}
        />
      </div>

      {/* Footer */}
      <footer className="mt-5 text-center text-xs text-zinc-400 font-mono select-none">
        <p>Created at: {cardData.created_at}</p>
        <p>Updated at: {cardData.updated_at}</p>
      </footer>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="flex items-center space-x-3 bg-zinc-800 rounded-lg px-4 py-2 shadow-sm hover:bg-zinc-700 transition-colors cursor-default select-text"
    >
      <div className="text-indigo-400 text-xl">{icon}</div>
      <div>
        <p className="font-semibold text-indigo-300">{label}</p>
        <p className="text-zinc-200">{value}</p>
      </div>
    </div>
  );
}
