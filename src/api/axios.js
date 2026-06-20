import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'

export const api = axios.create({
  baseURL: 'http://api.vetra-messenger.local/api/v1',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
