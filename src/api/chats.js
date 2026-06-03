import { api } from './axios'

export const fetchChats = async () => {
	const response = await api.get('/chats/')

	return response.data
}