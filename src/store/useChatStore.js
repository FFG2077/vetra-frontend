import { create } from 'zustand'

export const useChatStore = create((set) => ({
  chats: {},

  currentChat: null,

  setChats: (chatArray) => {
    const map = Object.fromEntries(chatArray.map((c) => [c.public_id, c]))
    set({ chats: map })
  },

  setMessages: (chatUuid, messages) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [chatUuid]: {
          ...state.chats[chatUuid],
          messages,
        },
      },
    })),

  setCurrentChat: (chat) =>
    set({
      currentChat: chat,
    }),

  addMessage: (uuid, message) =>
    set((state) => {
      const chat = state.chats[uuid] || { messages: [] }

      return {
        chats: {
          ...state.chats,
          [uuid]: {
            ...chat,
            messages: [...(chat.messages || []), message],
          },
        },
      }
    }),
}))
