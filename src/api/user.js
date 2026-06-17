import { api } from './axios'

export const get_me = async () => {
  try {
    const response = await api.get('/users/get_me/')

    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}
