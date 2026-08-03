import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNavigationStore = create(
  persist(
    (set) => ({
      activePage: 'chats',

      isMobileMenuOpen: false,
      isMobileChatOpen: false,

      setActivePage: (page) =>
        set({
          activePage: page,
          isMobileMenuOpen: false,
          isMobileChatOpen: false,
        }),

      openMobileMenu: () =>
        set({
          isMobileMenuOpen: true,
          isMobileChatOpen: false,
        }),

      openMobileChat: () =>
        set({
          isMobileChatOpen: true,
          isMobileMenuOpen: false,
        }),

      closeMobileChat: () =>
        set({
          isMobileChatOpen: false,
        }),
      
      closeMobileMenu: () =>
        set({
          isMobileMenuOpen: false,
        }),
    }),
    {
      name: 'navigation-storage',
    },
  ),
)
// activePage: 'chats',

// setActivePage: (page) => {
//   localStorage.removeItem("page")
//   localStorage.setItem("page", page)
//   set({ activePage: page })
// },
