import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";
import { CookieName } from "@/types/cookie-enum";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;

  setAccessToken: (token: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    accessToken: null,
    refreshToken: null,

    setAccessToken: (token) => {
      set({ accessToken: token });
      Cookies.set(CookieName.ACCESS_TOKEN, token);
    },

    setTokens: (accessToken, refreshToken) => {
      set({ accessToken, refreshToken });
      Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
      Cookies.set(CookieName.REFRESH_TOKEN, refreshToken);
    },

    logout: () => {
      set({ accessToken: null, refreshToken: null });
      Cookies.remove(CookieName.ACCESS_TOKEN);
      Cookies.remove(CookieName.REFRESH_TOKEN);
    },
  }))
);
