"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DigitalIDCardStyle1 from "../components/DigitalIDCardStyle1";
import DigitalIDCardStyle2 from "../components/DigitalIDCardStyle2";
import DigitalIDCardStyle3 from "../components/DigitalIDCardStyle3";
import DigitalIDCardSuperCute from "../components/DigitalIDCardSuperCute"; // <-- import cute style
import cardData from "../data/cardData";

export default function ViewIDPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const styleParam = searchParams.get("style");

  // parse style index, default to 1
  const styleIndex = styleParam ? parseInt(styleParam, 10) : 1;

  const renderCardStyle = () => {
    switch (styleIndex) {
      case 1:
        return <DigitalIDCardStyle1 cardData={cardData} />;
      case 2:
        return <DigitalIDCardStyle2 cardData={cardData} />;
      case 3:
        return <DigitalIDCardStyle3 cardData={cardData} />;
      case 4:
        return <DigitalIDCardSuperCute cardData={cardData} />; // cute style
      default:
        return <DigitalIDCardStyle1 cardData={cardData} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="mb-6 w-full max-w-md">
        <button
          onClick={() => router.push("/profile")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          ← Back to Profile
        </button>
      </div>

      <div>{renderCardStyle()}</div>
    </div>
  );
}
