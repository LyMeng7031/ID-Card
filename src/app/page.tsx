"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Mail, User, Edit3 } from "lucide-react";
import { userRequest } from "@/lib/api/user-api";
import { authRequest } from "@/lib/api/auth-api";

import { useAuthStore } from "@/app/store/auth-store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import CorporateCard from "./all-id-cards/components/cororate-card";
import ModernCard from "./all-id-cards/components/modern-card";
import Minimal from "./all-id-cards/components/minimal-card";

export default function Home() {
  const router = useRouter();
  const { PROFILE } = userRequest();
  const { AUTH_LOGOUT } = authRequest();

  const { checkAuth, isAuthenticated } = useAuthStore();

  // 🔐 1. Check auth on first render
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🔐 2. Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // 📡 3. Get user profile
  const { data: me, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => PROFILE(),
    enabled: isAuthenticated, // Only run if authenticated
  });

  // 🔄 4. Logout mutation
  const { mutate } = useMutation({
    mutationKey: ["Logout"],
    mutationFn: () => AUTH_LOGOUT(),
    onSuccess: () => {
      router.push("/login");
    },
  });
  const handleLogout = () => {
    mutate();
  };

  // 🔃 5. Switch between multiple cards
  const [cardIndex, setCardIndex] = useState(0);
  const cards = me?.data?.idCard || [];
  const currentCard = cards[cardIndex] || null;

  const handleChangeCard = () => {
    if (cards.length === 0) return;
    setCardIndex((prev) => (prev + 1) % cards.length);
  };

  // 🌀 Show loading
  // if (isLoading) {
  //   return <div className="text-center p-10">Loading...</div>;
  // }

  // ❌ Show nothing if user is missing
  if (!me || !me.data) {
    return null;
  }

  function setOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 items-center justify-center">
        {/* Header */}
        <div className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-0 rounded-t-2xl">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-pink-500 relative rounded-t-2xl">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Avatar + Info */}
          <div className="relative px-6 pb-6">
            <div className="flex justify-center -mt-14 mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={me.data.avatar} alt={me.data.full_name} />
                <AvatarFallback>{me.data.full_name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {me.data.full_name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <User className="h-4 w-4" />@{me.data.user_name}
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                {me.data.email}
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col space-y-5">
              <Link href="/create-id">
                <button className="w-full bg-green-700 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition cursor-pointer">
                  Create New Card
                </button>
              </Link>

              {cards.length > 1 && (
                <button
                  onClick={handleChangeCard}
                  className="w-full bg-green-700 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition cursor-pointer"
                >
                  Change Card
                </button>
              )}
            </div>

            <div className="text-center pt-3">
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
              {/* <Button
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button> */}
            </div>
          </div>
        </div>

        {/* Card Preview */}
        <div className="w-full max-w-md mx-auto p-4">
          <div className="grid grid-cols-1 gap-4">
            {currentCard ? (
              <>
                {currentCard.card_type === "Corporate" && (
                  <CorporateCard card={currentCard} />
                )}
                {currentCard.card_type === "Modern" && (
                  <ModernCard card={currentCard} />
                )}
                {currentCard.card_type === "Minimal" && (
                  <Minimal card={currentCard} />
                )}
              </>
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
