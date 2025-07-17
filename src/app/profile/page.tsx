"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { userRequest } from "@/lib/api/user-api";
import { User, Mail } from "lucide-react";

import CorporateCard from "../all-id-cards/components/cororate-card";
import Link from "next/link";
import ModernCard from "../all-id-cards/components/modern-card";
import Minimal from "../all-id-cards/components/minimal-card";

export default function Home() {
  const { PROFILE } = userRequest();
  const { data: me, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => PROFILE(),
  });

  const [cardIndex, setCardIndex] = useState(0);

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!me || !me.data) {
    return <div className="text-center p-10">Profile not found.</div>;
  }

  const cards = me.data.idCard || [];
  const currentCard = cards[cardIndex] || null;

  const handleChangeCard = () => {
    if (cards.length === 0) return;
    setCardIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 items-center justify-center">
        {/* Header */}
        <div className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-0 rounded-t-2xl">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-pink-500 relative rounded-t-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Avatar and user info */}
          <div className="relative px-6 pb-6">
            <div className="flex justify-center -mt-14 mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={me.data.avatar} alt={me.data.full_name} />
                  <AvatarFallback>
                    {me.data.full_name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {me.data.full_name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <User className="h-4 w-4" />@{me.data.user_name}
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />{me.data.email}
              </div>
            </div>

            <div className="pt-4 space-x-0.5">
              <Link href="/create-id">
                <div>
                  <button className="w-full bg-green-700 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition cursor-pointer">
                  Create New Card
                </button>
                </div>
              </Link>
              {cards.length > 1 && (
               <div>
                 <button
                  onClick={handleChangeCard}
                  className="w-full bg-green-700 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition cursor-pointer"
                >
                  Change Card
                </button>
               </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Preview */}
        <div className="w-full max-w-md mx-auto p-4">
          <div className="grid grid-cols-1 gap-4">
            {currentCard ? (
              <div>
                {currentCard.card_type === "Corporate" && (
                  <CorporateCard card={currentCard} />
                )}
                {currentCard.card_type === "Modern" && (
                  <ModernCard card={currentCard} />
                )}
                {currentCard.card_type === "Minimal" && (
                  <Minimal card={currentCard} />
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No ID cards created yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
