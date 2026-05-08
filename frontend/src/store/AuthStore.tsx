import { create } from "zustand";
import api from "../services/api";
import { persist } from "zustand/middleware";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  imageUrl?: string;
  resumeUrl?: string;
};

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      login: async (email, password) => {
        const response = await api.post("/users/login", { email, password });
        set({ user: response.data.user });
      },
      logout: async () => {
        await api.get("/users/logout");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
