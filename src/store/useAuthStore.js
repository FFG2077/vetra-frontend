import { create } from 'zustand'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export const useAuthStore = create((set, get) => ({
  public_id: null,
  name: null,
  email: null,

  accessToken: localStorage.getItem(ACCESS_TOKEN),
  refreshToken: localStorage.getItem(REFRESH_TOKEN),

  setTokens: ({ accessToken, refreshToken }) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)

    set({
      accessToken,
      refreshToken,
    })
  },

  setUser: ({ public_id, name, email }) => set({ public_id, name, email }),

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)

    set({
      public_id: null,
      name: null,
      email: null,
      accessToken: null,
      refreshToken: null,
    })
  },
}))
