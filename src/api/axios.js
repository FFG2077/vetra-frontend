import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

// const navigate = useNavigate()

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    // token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = useAuthStore.getState().refreshToken

        const response = await axios.post('http://127.0.0.1:8000/api/v1/users/refresh', {
          refresh_token: refreshToken,
        })

        const newAccess = response.data.access_token

        useAuthStore.getState().setTokens({
          accessToken: newAccess,
          refreshToken,
        })

        originalRequest.headers.Authorization = `Bearer ${newAccess}`

        return api(originalRequest)
      } catch (e) {
        useAuthStore.getState().logout()
        window.location.href = '/auth'

        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  },
)
