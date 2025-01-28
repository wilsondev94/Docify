import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false,
  setIsDarkMode: (darkMode) => set({ isDarkMode: darkMode }),
}));
