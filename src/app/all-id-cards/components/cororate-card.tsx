import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, Download, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardItem } from "@/types/card-type";
import { UserData } from "@/types/user-type";

const CorporateCardService = ({
  me,
  card,
  idx,
}: {
  me: UserData;
  card: CardItem;
  idx: number;
}) => {
  return (
    <div className="bg-black min-h-screen py-10 px-4">
      <div className="max-w-sm mx-auto space-y-6">
        <div key={idx}>
          <Card className="bg-neutral-900 text-white border border-gray-700 shadow-lg rounded-xl">
            <CardContent className="p-0 relative overflow-hidden rounded-xl">
              {/* Decorative Background Bubbles */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full translate-x-1/2 translate-y-1/2" />
              </div>

              <div className="relative z-10 p-6">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                      <AvatarImage src={me?.avatar} alt={me?.user_name} />
                      <AvatarFallback className="text-xl font-semibold bg-purple-600 text-white">
                        {me?.user_name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h1 className="text-xl font-bold text-white mb-1">
                    {me?.full_name}
                  </h1>
                  <p className="text-sm text-purple-300 font-semibold">
                    {card.job}
                  </p>
                </div>

                {/* Company Badge */}
                <div className="text-center mb-4">
                  <Badge className="bg-purple-700/30 border border-purple-600 text-purple-300 px-3 py-1 rounded-full text-xs">
                    {card.company}
                  </Badge>
                </div>

                {/* Bio */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6 text-center">
                  <p className="text-sm text-gray-300">{card.bio}</p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                    <Phone className="w-4 h-4 text-purple-400 mb-1 mx-auto" />
                    <p className="text-xs text-gray-400">Call Me</p>
                    <p className="text-sm text-white font-mono">{card.phone}</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                    <Mail className="w-4 h-4 text-purple-400 mb-1 mx-auto" />
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm text-white break-all">{me?.email}</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                    <Globe className="w-4 h-4 text-purple-400 mb-1 mx-auto" />
                    <p className="text-xs text-gray-400">Website</p>
                    <p className="text-sm text-white">{card.web_site}</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                    <MapPin className="w-4 h-4 text-purple-400 mb-1 mx-auto" />
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="text-sm text-white">{card.address}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={async () => {
                      const toBase64 = async (url: string) => {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        return new Promise<string>((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            resolve(
                              reader.result?.toString().split(",")[1] || ""
                            );
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
                      link.download = `${(
                        me?.full_name ?? "Unnamed_User"
                      ).replace(" ", "_")}_${idx + 1}.vcf`;

                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
                  >
                    <Download className="w-4 h-4 mr-2" /> Save Contact
                  </Button>

                  {/* Social Links */}
                  <div className="space-y-2">
                    {card.socialLinks.map((res, idx: number) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 bg-black flex items-center gap-2"
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={res.icon} alt={res.platform} />
                          <AvatarFallback className="bg-purple-500 text-white text-sm">
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CorporateCardService;
