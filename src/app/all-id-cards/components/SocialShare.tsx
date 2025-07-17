"use client";

import { FaFacebookF, FaGithub, FaLink } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

interface SocialLink {
  platform: string;
  url: string;
}

export default function SocialShare({ links }: { links: SocialLink[] }) {
  if (!links || links.length === 0) return null;

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
      <div className="text-2xl">{icon}</div>
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
      {links.map((link, index) => {
        const icon =
          link.platform === "facebook" ? (
            <FaFacebookF className="text-blue-500" />
          ) : link.platform === "tiktok" ? (
            <SiTiktok className="text-pink-500" />
          ) : link.platform === "github" ? (
            <FaGithub className="text-gray-800" />
          ) : (
            <FaLink />
          );

        const color =
          link.platform === "facebook"
            ? "bg-blue-500"
            : link.platform === "tiktok"
            ? "bg-pink-500"
            : link.platform === "github"
            ? "bg-gray-800"
            : "bg-gray-500";

        return (
          <ButtonRow
            key={index}
            icon={icon}
            text={`Visit ${link.platform}`}
            color={color}
            onClick={() => openInNewTab(link.url)}
          />
        );
      })}
    </div>
  );
}
