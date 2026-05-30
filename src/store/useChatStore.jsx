import { create } from 'zustand'

export const useChatStore = create((set) => ({
  chats: {
    "128389hd4n3": {
      chat_name: "st3rs",
      uuid: "128389hd4n3",
      description: "This is a chat",
      messages: [
        { uuid: '3b478bbbv834', text: 'Hello!', user_uuid: 'user1', user_name: 'St3rs' },
        { uuid: '12h9d32', text: 'Hi there!', user_uuid: 'user2', user_name: 'F.F.G.' },
      ]
    },
    "dn4uiniud43": {
      chat_name: "arka",
      uuid: "dn4uiniud43",
      description: "This is a group",
      messages: [
        { uuid: '3b478bbbv834', text: 'What\'s up?', user_uuid: 'user1', user_name: 'F.F.G.' },
        { uuid: '12h9d32', text: 'Today i\'m doing well. What about you?', user_uuid: 'user3', user_name: 'Charlie' },
      ]
    },
  },

  currentChat: null,

  setCurrentChat: (chat) =>
    set({
      currentChat: chat,
    }),

  addMessage: (uuid, message) =>
    set((state) => ({
      chats: {
        ...state.chats,
        [uuid]: {
          ...state.chats[uuid],
          messages: [...(state.chats[uuid]?.messages || []), message],
          message
        }
      },
    })),
}))
