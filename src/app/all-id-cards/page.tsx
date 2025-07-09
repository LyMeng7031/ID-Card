"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DigitalIDCardStyle1 from "../components/DigitalIDCardStyle1";
import DigitalIDCardStyle2 from "../components/DigitalIDCardStyle2";
import DigitalIDCardStyle3 from "../components/DigitalIDCardStyle3";
import DigitalIDCardSuperCute from "../components/DigitalIDCardSuperCute"; // <-- import cute style
import cardData from "../data/cardData";

export default function AllIDCardsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(0); // 0 = All, 1 = Classic, 2 = Modern, 3 = Minimal, 4 = Cute
  const [fade, setFade] = useState(false);

  const styleButtons = [
    { id: 0, name: "All Cards" },
    { id: 1, name: "Classic Style" },
    { id: 2, name: "Modern Style" },
    { id: 3, name: "Minimal Style" },
    { id: 4, name: "Cute Style 🐾" }, // added cute style button
  ];

  const handleSelect = (id: number) => {
    setFade(true);
    setTimeout(() => {
      setSelected(id);
      setFade(false);
    }, 250);
  };

  const renderCard = () => {
    if (selected === 0) {
      return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
          <div className="flex justify-center">
            <DigitalIDCardStyle1 cardData={cardData} />
          </div>
          <div className="flex justify-center">
            <DigitalIDCardStyle2 cardData={cardData} />
          </div>
          <div className="flex justify-center">
            <DigitalIDCardStyle3 cardData={cardData} />
          </div>
          <div className="flex justify-center">
            <DigitalIDCardSuperCute cardData={cardData} /> {/* cute card included */}
          </div>
        </div>
      );
    }

    const cardComponent = {
      1: <DigitalIDCardStyle1 cardData={cardData} />,
      2: <DigitalIDCardStyle2 cardData={cardData} />,
      3: <DigitalIDCardStyle3 cardData={cardData} />,
      4: <DigitalIDCardSuperCute cardData={cardData} />, // cute style
    };

    return (
      <div
        className={`flex justify-center transform transition-all duration-500 ${
          fade ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {cardComponent[selected as 1 | 2 | 3 | 4]}
      </div>
    );
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-tr from-white via-gray-100 to-gray-200 text-gray-800">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/profile")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          ← Back to Profile
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">ID Card Styles</h1>

      {/* Style Switch Buttons */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {styleButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleSelect(btn.id)}
            className={`cursor-pointer px-5 py-2.5 rounded-full font-medium shadow transition-all duration-200 ${
              selected === btn.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {btn.name}
          </button>
        ))}
      </div>

      {/* Card Display */}
      {renderCard()}
    </div>
  );
}
