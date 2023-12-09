import { create } from 'zustand';

interface themeTypes {
    width: number,
    setWidth: any
}

export const useThemeStore = create<themeTypes>((set) => ({
    width: 250,
    setWidth: (wid: number) => set((state) => ({ width: state.width + wid })),
}));
