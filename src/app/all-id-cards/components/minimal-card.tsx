"use client";

import React from "react";
import {
  FaVenusMars,
  FaBirthdayCake,
  FaFlag,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiEdit, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SocialShare from "./SocialShare";
import { CardItem } from "@/types/card-type";

export default function CorporateCard({ card }: { card: CardItem }) {
  const router = useRouter();

  return (
    <div
      className="relative w-full max-w-sm bg-gradient-to-tr from-black via-gray-800 to-gray-900 text-gray-100 border-2 border-yellow-400 rounded-lg p-6 mx-auto font-mono"
      style={{
        boxShadow: "0 0 20px 6px rgba(255, 215, 0, 0.3)",
      }}
    >
      {/* View + Edit Icons */}
      

      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={card.profile_url}
          alt="Profile"
          className="w-24 h-24 rounded-md border-2 border-yellow-300 object-cover cursor-pointer"
          style={{
            boxShadow: "0 0 15px 4px rgba(255, 215, 0, 0.7)",
          }}
        />
        <h1
          className="text-xl font-bold text-yellow-300 mt-3 uppercase"
          style={{ textShadow: "0 0 8px rgba(255, 215, 0, 0.8)" }}
        >
          Clearance ID
        </h1>
        <p className="text-xs text-yellow-100 tracking-widest">
          ID: {card.id} | Unit: {card.user_id}
        </p>
      </div>

      {/* Info Fields */}
      <div className="grid grid-cols-1 gap-3 text-sm">
        <InfoItem label="Gender" value={card.gender} icon={<FaVenusMars />} />
        <InfoItem label="DOB" value={card.dob} icon={<FaBirthdayCake />} />
        <InfoItem label="Nationality" value={card.nationality} icon={<FaFlag />} />
        <InfoItem label="Phone" value={card.phone} icon={<FaPhoneAlt />} />
        <InfoItem label="Address" value={card.address} icon={<FaMapMarkerAlt />} />
      </div>

      {/* QR + Share */}
      <div className="mt-5 flex justify-between items-center">
        <img
          src={card.qr_url}
          alt="QR Code"
          className="w-20 h-20 rounded border border-yellow-300 shadow-sm cursor-pointer"
          style={{
            boxShadow: "0 0 12px 4px rgba(255, 215, 0, 0.6)",
          }}
        />
        <div className="ml-2">
          <SocialShare links={[]} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-yellow-600 pt-3 text-xs text-yellow-100 text-center tracking-wide">
        <p>Issued: {card.created_at}</p>
        <p>Updated: {card.updated_at}</p>
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
      <div className="text-yellow-400 mt-1 cursor-pointer">{icon}</div>
      <div>
        <p className="text-yellow-200 font-semibold">{label}</p>
        <p className="text-gray-100">{value}</p>
      </div>
    </div>
  );
}
