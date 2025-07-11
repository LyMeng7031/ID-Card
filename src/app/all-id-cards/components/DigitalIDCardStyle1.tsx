import React from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import SocialShare from "../components/SocialShare";
import { useRouter } from "next/navigation";

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

export default function DigitalIDCard({ cardData }: { cardData: CardData }) {
  const router = useRouter();

  return (
    <div
      className="relative max-w-sm w-full rounded-3xl bg-gradient-to-br from-blue-500 to-blue-900 backdrop-blur-lg border-t-4 border-indigo-500 shadow-lg p-8 text-gray-100"
      style={{
        boxShadow: "0 0 20px 4px rgba(99, 102, 241, 0.6)",
      }}
    >
      {/* View & Edit Buttons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={() => router.push(`/view-id?style=1`)}
          title="View Card"
          className="text-white hover:text-green-300 transition-all duration-200 cursor-pointer" 
        >
          <FiEye size={22} />
        </button>

        <button
          onClick={() => router.push("/edit-id")}
          title="Edit Card"
          className="text-white hover:text-yellow-300 transition-all duration-200 cursor-pointer"
        >
          <FiEdit size={22} />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center mb-8 space-x-6">
        <div
          className="relative rounded-full p-1"
          style={{
            boxShadow: `0 0 12px 4px ${cardData.theme_color}`,
          }}
        >
          <img
            src={cardData.profile_url}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-indigo-400"
          />
        </div>
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
          Digital ID Card
        </h1>
      </div>

      {/* Info */}
      <div className="space-y-5">
        <InfoRow label="ID" value={cardData.id} />
        <InfoRow label="User ID" value={cardData.user_id} />
        <InfoRow label="Gender" value={cardData.gender} />
        <InfoRow label="Date of Birth" value={cardData.dob} />
        <InfoRow label="Nationality" value={cardData.nationality} />
        <InfoRow label="Phone" value={cardData.phone} />
        <InfoRow label="Address" value={cardData.address} />
      </div>

      {/* Social Share */}
      <SocialShare />

      {/* QR Code */}
      <div className="flex justify-center mt-8">
        <img
          src={cardData.qr_url}
          alt="QR Code"
          className="w-36 h-36 rounded-lg border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
        />
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-between text-sm font-mono text-indigo-300">
        <div>Created: {cardData.created_at}</div>
        <div>Updated: {cardData.updated_at}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between border-b border-indigo-600/50 pb-1">
      <span className="font-semibold text-indigo-300">{label}</span>
      <span className="font-medium text-indigo-100">{value}</span>
    </div>
  );
}
