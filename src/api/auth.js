import { api } from './axios'

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login/', { email, password })

    return response.data

  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const register = async (name, email, password, confirmPassword) => {
  try {
		console.log('Registering user with:', { name, email, password, confirmPassword })
		if (password !== confirmPassword) {
			throw new Error('Passwords do not match')
		}

    const response = await api.post('/users/registration/', { name, email, password })

    return response.data

  } catch (error) {
    throw error.response?.data || error.message
  }
}
