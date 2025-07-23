import { Download, Globe, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { ICard, User } from "@/types/card-type";

const ModernCardServerSide = ({
  me,
  card,
  idx,
}: {
  me: User;
  card: ICard;
  idx: number;
}) => {
  return (
    <div className="mt-10 w-full max-w-md mx-auto px-4 bg-black rounded-xl shadow-lg border border-gray-800">
      <div className="overflow-hidden rounded-xl bg-neutral-900 border border-gray-700 shadow-xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10 text-center">
              <Avatar className="w-24 h-24 border-4 border-white mx-auto shadow-md">
                <AvatarImage src={me?.avatar} alt={me?.user_name} />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                  {me?.user_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold text-white mt-4">
                {me?.full_name}
              </h1>
              <p className="text-pink-100 font-medium text-sm">{card.job}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full" />
              <span className="text-pink-400 text-sm font-semibold tracking-wide uppercase">
                {card.company || "N/A"}
              </span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {card.bio || "No bio provided."}
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
              {[
                {
                  icon: <Phone className="w-4 h-4 text-pink-400" />,
                  label: "Phone",
                  value: card.phone,
                },
                {
                  icon: <Mail className="w-4 h-4 text-pink-400" />,
                  label: "Email",
                  value: me?.email,
                },
                {
                  icon: <Globe className="w-4 h-4 text-pink-400" />,
                  label: "Website",
                  value: card.web_site,
                },
                {
                  icon: <MapPin className="w-4 h-4 text-pink-400" />,
                  label: "Location",
                  value: card.address,
                },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-xs text-gray-400">{item.label}</span>
                  </div>
                  <p className="text-sm text-white break-words">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Download + Social */}
            <div className="pt-4 space-y-3">
              <Button
                onClick={async () => {
                  const toBase64 = async (url: string) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise<string>((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        resolve(reader.result?.toString().split(",")[1] || "");
                      reader.onerror = reject;
                      reader.readAsDataURL(blob);
                    });
                  };

                  const avatarBase64 = me?.avatar
                    ? await toBase64(me?.avatar)
                    : "";

                  const vcard = [
                    "BEGIN:VCARD",
                    "VERSION:3.0",
                    `FN:${me?.full_name}`,
                    `N:${me?.full_name};;;;`,
                    `ORG:${card.company}`,
                    `TITLE:${card.job}`,
                    `TEL;TYPE=WORK,VOICE:${card.phone}`,
                    `EMAIL;TYPE=PREF,INTERNET:${me?.email}`,
                    avatarBase64
                      ? `PHOTO;ENCODING=b;TYPE=JPEG:${avatarBase64}`
                      : "",
                    `URL:${card.web_site}`,
                    `ADR;TYPE=WORK:;;${card.address};;;;`,
                    `NOTE:${card.bio}`,
                    "END:VCARD",
                  ]
                    .filter(Boolean)
                    .join("\r\n");

                  const blob = new Blob([vcard], {
                    type: "text/vcard;charset=utf-8",
                  });

                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `${(me?.full_name ?? "Unnamed_User").replace(
                    " ",
                    "_"
                  )}_${idx + 1}.vcf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                }}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-md"
              >
                <Download className="w-4 h-4 mr-2" />
                Save Contact
              </Button>

              {/* Social Buttons */}
              <div className="space-y-2">
                {card.socialLinks.map((res, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="w-full flex gap-2 items-center bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={res.icon} alt={res.platform} />
                      <AvatarFallback className="text-sm font-semibold bg-pink-600 text-white">
                        {res.platform.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {res.platform}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ModernCardServerSide;
