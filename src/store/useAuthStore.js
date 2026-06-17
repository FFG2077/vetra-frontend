import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  uuid: null,
  name: null,
  email: null,
  accessToken: null,

  setAccessToken: (accessToken) =>
    set({ accessToken }),

  setUser: ({ uuid, name, email }) =>
    set({ uuid, name, email }),

  logout: () =>
    set({
      uuid: null,
      name: null,
      email: null,
      accessToken: null,
    })

}))

