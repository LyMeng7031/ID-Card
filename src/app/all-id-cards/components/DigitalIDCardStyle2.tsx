import React from "react";
import {
  FaVenusMars,
  FaBirthdayCake,
  FaFlag,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiEdit, FiEye } from "react-icons/fi"; // Added FiEye icon
import { useRouter } from "next/navigation";
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

export default function DigitalIDCardAlt({ cardData }: { cardData: CardData }) {
  const router = useRouter();

  return (
    <div
      className="relative w-full max-w-sm bg-gradient-to-tr from-emerald-400 via-emerald-500 backdrop-blur-xl rounded-3xl p-8 text-white shadow-lg mx-auto border border-green-300"
      style={{ boxShadow: "0 8px 24px rgba(34, 197, 94, 0.6)" }}
    >
      {/* View and Edit Icons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={() => router.push(`/view-id?style=2`)}
          title="View Card"
          className="text-white hover:text-green-200 transition-all duration-200 cursor-pointer"
        >
          <FiEye size={22} />
        </button>
        <button
          onClick={() => router.push("/edit-id")}
          title="Edit Card"
          className="text-white hover:text-yellow-300 cursor-pointer transition-all duration-200"
        >
          <FiEdit size={22} />
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center space-y-6 mb-6">
        <img
          src={cardData.profile_url}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-green-400 shadow-md object-cover"
          style={{ boxShadow: "0 0 12px 4px rgba(34,197,94,0.6)" }}
        />
        <h1 className="text-2xl font-bold text-green-300 tracking-wide drop-shadow-md">
          Digital ID
        </h1>
        <p className="text-sm text-green-100">
          ID: {cardData.id} | User: {cardData.user_id}
        </p>
      </div>

      {/* Info Fields */}
      <div className="space-y-3 text-sm">
        <InfoItem icon={<FaVenusMars />} label="Gender" value={cardData.gender} />
        <InfoItem icon={<FaBirthdayCake />} label="DOB" value={cardData.dob} />
        <InfoItem icon={<FaFlag />} label="Nationality" value={cardData.nationality} />
        <InfoItem icon={<FaPhoneAlt />} label="Phone" value={cardData.phone} />
        <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={cardData.address} />
      </div>

      <SocialShare />

      {/* QR Code */}
      <div className="mt-6 flex justify-center">
        <img
          src={cardData.qr_url}
          alt="QR Code"
          className="w-28 h-28 rounded-xl border border-green-400 shadow-sm"
          style={{ boxShadow: "0 0 15px rgba(34, 197, 94, 0.7)" }}
        />
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-green-200 font-mono text-center border-t border-green-500 pt-3">
        <p>Created: {cardData.created_at}</p>
        <p>Updated: {cardData.updated_at}</p>
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
    <div className="flex items-center space-x-3 bg-green-500/10 px-4 py-2 rounded-xl shadow-sm">
      <div className="text-green-300">{icon}</div>
      <div className="flex-1">
        <p className="text-green-100 font-semibold">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
}
