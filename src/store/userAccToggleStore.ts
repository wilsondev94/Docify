import { create } from "zustand";

interface UserAccToggleState {
  isUserAccToggle: boolean;
  setIsUserAccToggle: (isUserAccToggle: boolean) => void;
}

export const useUserAccToggleStore = create<UserAccToggleState>((set) => ({
  isUserAccToggle: false,
  setIsUserAccToggle: (isUserAccToggle) =>
    set({ isUserAccToggle: isUserAccToggle }),
}));
