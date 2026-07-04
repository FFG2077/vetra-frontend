import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNavigationStore = create(
  persist((set) => ({
    activePage: 'chats',
    setActivePage: (page) => set({ activePage: page }),

  }),
  {
    name: 'navigation-storage',
  }
),
)
// activePage: 'chats',

// setActivePage: (page) => {
//   localStorage.removeItem("page")
//   localStorage.setItem("page", page)
//   set({ activePage: page })
// },
