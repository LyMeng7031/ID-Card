"use client";

import React from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import SocialShare from "../components/SocialShare"; // Make sure path is correct
import { useRouter } from "next/navigation";
import { CardItem } from "@/types/card-type"; // Adjust the path to your types

export default function CorporateCard({ card }: { card: CardItem }) {
  const router = useRouter();

  if (!card) return <div>Loading...</div>;

  return (
    <div
      className="relative max-w-sm w-full rounded-3xl bg-gradient-to-br from-blue-500 to-blue-900 backdrop-blur-lg border-t-4 border-indigo-500 shadow-lg p-8 text-gray-100"
      style={{
        boxShadow: "0 0 20px 4px rgba(99, 102, 241, 0.6)",
      }}
    >
      {/* View & Edit Buttons */}
      

      {/* Header */}
      <div className="flex items-center mb-8 space-x-6">
        <div
          className="relative rounded-full p-1"
          style={{
            boxShadow: `0 0 12px 4px ${card.theme_color}`,
          }}
        >
          <img
            src={card.profile_url}
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
        <InfoRow label="ID" value={card.id} />
        <InfoRow label="User ID" value={card.user_id} />
        <InfoRow label="Gender" value={card.gender} />
        <InfoRow label="Date of Birth" value={card.dob} />
        <InfoRow label="Nationality" value={card.nationality} />
        <InfoRow label="Phone" value={card.phone} />
        <InfoRow label="Address" value={card.address} />
      </div>

      {/* Social Share */}
      <div className="mt-6">
        <SocialShare links={[]} />
      </div>

      {/* QR Code */}
      <div className="flex justify-center mt-8">
        <img
          src={card.qr_url}
          alt="QR Code"
          className="w-36 h-36 rounded-lg border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
        />
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-between text-sm font-mono text-indigo-300">
        <div>Created: {card.created_at}</div>
        <div>Updated: {card.updated_at}</div>
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
