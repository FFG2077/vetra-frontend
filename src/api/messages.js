import { api } from './axios'

export const getMessages = async (chatUuid) => {
  try {
    const response = await api.get('/chat/history', {
      params: {
        chat_uuid: chatUuid,
      },
    })

    return response.data
  } catch (error) {
    console.error(error)
  }
}
