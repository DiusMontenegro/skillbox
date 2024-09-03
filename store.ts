import { create } from "zustand";

type ThemeStore = {
    theme: string;
    setLight: () => void;
    setDark: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: "light",
    setLight: () => set((state) => ({ theme: (state.theme = "light") })),
    setDark: () => set((state) => ({ theme: (state.theme = "dark") })),
}));
