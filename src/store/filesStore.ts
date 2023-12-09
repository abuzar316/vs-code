
import { create } from 'zustand';

interface themeTypes {
    setAllFiles: any,
    allFiles: any,
    setActiveFiles: any,
    activeFiles: any,
    fileExplore: any,
    setFileExplore: any,
    deleteActiveFiles: any,
    activeFileIndex: number,
    setActiveFileIndex: any,
    currentFolder: any,
    setCurrentFolder: any
}

export const useFilesStore = create<themeTypes>((set, get) => ({
    currentFolder: "",
    setCurrentFolder: (data: number) => set(() => ({ currentFolder: data })),
    activeFiles: [],
    setActiveFiles: (data: any) => {
        const activeFiles = get().activeFiles
        const isExist = activeFiles.findIndex((item: any) => item.path === data.path)
        if (-1 === isExist) {
            set(() => ({ activeFileIndex: activeFiles.length }))
        }
        if (0 <= isExist) {
            set(() => ({ activeFileIndex: isExist }))
        }
        if (0 > isExist) {
            set((state) => ({ activeFiles: [...state.activeFiles, data] }))
        }
    },
    activeFileIndex: 0,
    setActiveFileIndex: (index: number) => set((state) => ({ activeFileIndex: index })),
    allFiles: [],
    setAllFiles: (data: number) => set(() => ({ allFiles: data })),
    fileExplore: [],
    setFileExplore: (data: number) => set(() => ({ fileExplore: data })),
    deleteActiveFiles: (index: number) => {
        const { activeFiles, activeFileIndex } = get()
        activeFiles.splice(index, 1)

        if (activeFileIndex === activeFiles.length) {
            set(() => ({ activeFileIndex: activeFileIndex - 1 }))
        }

        set(() => ({ activeFiles: activeFiles }))
    },
}));