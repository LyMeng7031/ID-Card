"use client";

import { FaFacebookF, FaGithub, FaLink } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function SocialShare() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const ButtonRow = ({
    icon,
    text,
    color,
    onClick,
  }: {
    icon: React.ReactNode;
    text: string;
    color: string;
    onClick: () => void;
  }) => (
    <div className="flex items-center gap-4 mb-4">
      {/* Icon outside with no bg */}
      <div className="text-2xl">{icon}</div>

      {/* Text box with hover and pointer */}
      <button
        onClick={onClick}
        className={`flex-1 px-4 py-2 rounded-lg shadow-md text-white ${color} hover:opacity-90 cursor-pointer transition text-left`}
      >
        {text}
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-8">
      <ButtonRow
        icon={<FaFacebookF className="text-blue-500" />}
        text="Share on Facebook"
        color="bg-blue-500"
        onClick={() =>
          openInNewTab(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
          )
        }
      />

      <ButtonRow
        icon={<SiTiktok className="text-pink-500" />}
        text="Share to TikTok"
        color="bg-pink-500"
        onClick={() => openInNewTab("https://www.tiktok.com/upload?lang=en")}
      />

      <ButtonRow
        icon={<FaGithub className="text-gray-800" />}
        text="Visit GitHub"
        color="bg-gray-800"
        onClick={() => openInNewTab("https://github.com/your-github-profile")}
      />
      
    </div>
  );
}
