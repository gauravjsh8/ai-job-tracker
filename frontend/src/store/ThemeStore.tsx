import { create } from "zustand";

type ThemeStore = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: localStorage.getItem("theme") === "dark",
  toggleTheme: () => {
    set((state) => {
      const newTheme = !state.darkMode;
      localStorage.setItem("theme", newTheme ? "dark" : "light");

      return {
        darkMode: newTheme,
      };
    });
  },
}));
