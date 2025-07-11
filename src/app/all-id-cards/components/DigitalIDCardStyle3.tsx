import React from "react";
import {
  FaVenusMars,
  FaBirthdayCake,
  FaFlag,
  FaPhoneAlt,
  FaMapMarkerAlt,
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
};

export default function DigitalIDCardStyle9({ cardData }: { cardData: CardData }) {
  const router = useRouter(); // 🆕 Use router

  return (
    <div
      className="relative w-full max-w-sm bg-gradient-to-tr from-black via-gray-800 to-gray-900 text-gray-100 border-2 border-yellow-400 rounded-lg p-6 mx-auto font-mono"
      style={{
        boxShadow: "0 0 20px 6px rgba(255, 215, 0, 0.3)",
      }}
    >
      {/* 🆕 Edit Icon */}
      <button
        onClick={() => router.push("/edit-id")}
        title="Edit Card"
        className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-500 cursor-pointer transition-all duration-200"
      >
        <FiEdit size={20} />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={cardData.profile_url}
          alt="Profile"
          className="w-24 h-24 rounded-md border-2 border-yellow-300 object-cover"
          style={{
            boxShadow: "0 0 15px 4px rgba(255, 215, 0, 0.7)",
          }}
        />
        <h1
          className="text-xl font-bold text-yellow-300 mt-3 uppercase"
          style={{
            textShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
          }}
        >
          Clearance ID
        </h1>
        <p className="text-xs text-yellow-100 tracking-widest">
          CID: {cardData.id} | Unit: {cardData.user_id}
        </p>
      </div>

      {/* Info Fields */}
      <div className="grid grid-cols-1 gap-3 text-sm">
        <InfoItem label="Gender" value={cardData.gender} icon={<FaVenusMars />} />
        <InfoItem label="DOB" value={cardData.dob} icon={<FaBirthdayCake />} />
        <InfoItem label="Nationality" value={cardData.nationality} icon={<FaFlag />} />
        <InfoItem label="Phone" value={cardData.phone} icon={<FaPhoneAlt />} />
        <InfoItem label="Address" value={cardData.address} icon={<FaMapMarkerAlt />} />
      </div>

      {/* QR + Share */}
      <div className="mt-5 flex justify-between items-center">
        <img
          src={cardData.qr_url}
          alt="QR Code"
          className="w-20 h-20 rounded border border-yellow-300"
          style={{
            boxShadow: "0 0 12px 4px rgba(255, 215, 0, 0.6)",
          }}
        />
        <div className="ml-2">
          <SocialShare />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-yellow-600 pt-3 text-xs text-yellow-100 text-center tracking-wide">
        <p>Issued: {cardData.created_at}</p>
        <p>Updated: {cardData.updated_at}</p>
        <p
          className="mt-2 text-yellow-400 font-bold"
          style={{ textShadow: "0 0 6px rgba(255,215,0,0.8)" }}
        >
          AUTHORIZED USE ONLY
        </p>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-yellow-400 mt-1">{icon}</div>
      <div>
        <p className="text-yellow-200 font-semibold">{label}</p>
        <p className="text-gray-100">{value}</p>
      </div>
    </div>
  );
}
