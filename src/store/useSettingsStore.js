import { create } from 'zustand'

export const useSettingsStore = create((set) => ({
  isOpen: false,

  currentTab: 'account',

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),

  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  setTab: (tab) =>
    set({
      currentTab: tab,
    }),
}))
