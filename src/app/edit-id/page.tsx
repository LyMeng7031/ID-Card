"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import cardData from "../data/cardData";

export default function EditIDCardPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: cardData.fullName || "",
    gender: cardData.gender || "",
    dob: cardData.dob || "",
    nationality: cardData.nationality || "",
    phone: cardData.phone || "",
    address: cardData.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Data:", formData);

    // Optional: Save to global state or localStorage here
    // localStorage.setItem("cardData", JSON.stringify(formData));

    router.push("/profile"); // Go back to profile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 px-4 py-4 text-white relative">
      {/* Back Button */}
      <button
        onClick={() => router.push("/profile")}
        className="absolute top-4 left-4 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer font-semibold"
      >
        ← Back
      </button>

      {/* Form */}
      <div className="flex items-center justify-center min-h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-white text-blue-900 rounded-2xl shadow-lg px-6 py-8 w-full max-w-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-center mb-2">Edit ID Card</h1>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="w-full px-4 py-2 rounded-md border border-blue-300"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            className="w-full px-4 py-2 rounded-md border border-blue-300"
          />

          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Nationality"
            className="w-full px-4 py-2 rounded-md border border-blue-300"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2 rounded-md border border-blue-300"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 rounded-md border border-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md font-semibold hover:brightness-110 hover:scale-105 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
