import { create } from 'zustand'

const TOKEN_KEY = 'access_token'

export const useAuthStore = create((set, get) => ({
  uuid: null,
  name: null,
  email: null,
  accessToken: localStorage.getItem(TOKEN_KEY),

  setAccessToken: (accessToken) => {
    localStorage.setItem(TOKEN_KEY, accessToken)
    set({ accessToken })
  },

  setUser: ({ uuid, name, email }) => set({ uuid, name, email }),

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)

    set({
      uuid: null,
      name: null,
      email: null,
      accessToken: null,
    })
  },
}))
