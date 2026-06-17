import { api } from './axios'

export const getChats = async () => {
  try {
    const response = await api.get('/users/my_chats/')

    return response.data
  } catch (error) {
    console.error(error)
  }
}
