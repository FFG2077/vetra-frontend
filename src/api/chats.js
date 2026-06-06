import { api } from './axios'

export const getChats = async () => {
	const response = await api.get('/users/my_chats/')

	return response.data
}