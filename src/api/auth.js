import { api } from './axios'

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login/', { email, password })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const register = async (name, email, password) => {
  try {
    const response = await api.post('/users/registration/', { name, email, password })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}
