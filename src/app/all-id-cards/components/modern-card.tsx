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
import { CardItem } from "@/types/card-type";
import SocialShare from "./SocialShare";

export default function DigitalIDCardAlt({ card }: { card: CardItem }) {
  const router = useRouter();

  return (
    <div
      className="relative w-full max-w-sm bg-gradient-to-tr from-emerald-400 via-emerald-500 backdrop-blur-xl rounded-3xl p-8 text-white shadow-lg mx-auto border border-green-300"
      style={{ boxShadow: "0 8px 24px rgba(34, 197, 94, 0.6)" }}
    >
      {/* View and Edit Icons */}
      

      {/* Profile */}
      <div className="flex flex-col items-center space-y-6 mb-6">
        <img
          src={card.profile_url}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-green-400 shadow-md object-cover"
          style={{ boxShadow: "0 0 12px 4px rgba(34,197,94,0.6)" }}
        />
        <h1 className="text-2xl font-bold text-green-300 tracking-wide drop-shadow-md">
          Digital ID
        </h1>
        <p className="text-sm text-green-100">
          ID: {card.id} | Unit: {card.user_id}
        </p>
      </div>

      {/* Info Fields */}
      <div className="space-y-3 text-sm">
        <InfoItem icon={<FaVenusMars />} label="Gender" value={card.gender} />
        <InfoItem icon={<FaBirthdayCake />} label="DOB" value={card.dob} />
        <InfoItem icon={<FaFlag />} label="Nationality" value={card.nationality} />
        <InfoItem icon={<FaPhoneAlt />} label="Phone" value={card.phone} />
        <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={card.address} />
      </div>

      {/* Social Links */}
      <SocialShare links={card.socialLinks || []} />

      {/* QR Code */}
      <div className="mt-6 flex justify-center">
        {card.qr_url || card.qr_code ? (
          <img
            src={card.qr_url || card.qr_code}
            alt="QR Code"
            className="w-28 h-28 rounded-xl border border-green-400 shadow-sm"
            style={{ boxShadow: "0 0 15px rgba(34, 197, 94, 0.7)" }}
          />
        ) : (
          <p className="text-green-100 text-xs">QR code not available</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-green-200 font-mono text-center border-t border-green-500 pt-3">
        <p>Created: {card.created_at}</p>
        <p>Updated: {card.updated_at}</p>
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
