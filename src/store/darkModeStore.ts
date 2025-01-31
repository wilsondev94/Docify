import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DarkModeState {
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
}

// export const useDarkModeStore = create<DarkModeState>((set) => ({
//   isDarkMode: false,
//   setIsDarkMode: (darkMode) => set({ isDarkMode: darkMode }),
// }));

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false, // Default to light mode
      setIsDarkMode: () => set({ isDarkMode: !get().isDarkMode }),
    }),
    {
      name: "darkMode-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Persist in localStorage
    }
  )
);
