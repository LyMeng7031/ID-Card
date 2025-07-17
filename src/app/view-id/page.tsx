"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DigitalIDCardStyle1 from "../all-id-cards/components/cororate-card";
import DigitalIDCardStyle2 from "../all-id-cards/components/modern-card";
import DigitalIDCardStyle3 from "../all-id-cards/components/minimal-card";

// Simulated fetch from localStorage
function getCardById(id: string) {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("userCards");
  const cards = stored ? JSON.parse(stored) : [];
  return cards.find((card: any) => card.id === id) || null;
}

export default function ViewIDPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cardId = searchParams.get("id");
  const styleParam = searchParams.get("style");
  const styleIndex = styleParam ? parseInt(styleParam, 10) : 1;

  const [card, setCard] = useState<any>(null);

  useEffect(() => {
    if (!cardId) {
      router.push("/profile");
      return;
    }

    const fetchedCard = getCardById(cardId);
    if (!fetchedCard) {
      alert("Card not found");
      router.push("/profile");
    } else {
      setCard(fetchedCard);
    }
  }, [cardId, router]);

  const renderCardStyle = () => {
    if (!card) return null;

    switch (styleIndex) {
      case 1:
        return <DigitalIDCardStyle1 card={card} />;
      case 2:
        return <DigitalIDCardStyle2 card={card} />;
      case 3:
        return <DigitalIDCardStyle3 card={card} />;
      default:
        return <DigitalIDCardStyle1 card={card} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Back Button */}
      <div className="mb-6 w-full max-w-md">
        <button
          onClick={() => router.push("/profile")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          ← Back to Profile
        </button>
      </div>

      {/* Switch Style Buttons */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() =>
              router.push(`/view-id?id=${cardId}&style=${num}`)
            }
            className={`px-4 py-2 rounded ${
              styleIndex === num
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            } border border-blue-600 hover:bg-blue-700 hover:text-white transition`}
          >
            Style {num}
          </button>
        ))}
      </div>

      {/* Render Card */}
      {card ? (
        <div>{renderCardStyle()}</div>
      ) : (
        <div className="text-gray-600">Loading card...</div>
      )}
    </div>
  );
}
