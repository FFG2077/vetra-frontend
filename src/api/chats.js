import { api } from './axios'

export const getChats = async () => {
  try {
    const response = await api.get('/users/my_chats')

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createDirectChat = async (friend_uuid) => {
  const response = await api.post('/chat/create_direct_chat', null, { params: { friend_uuid } })

  return response.data
}

export const createGroupChat = async (name, members) => {
  const response = await api.post('/chat/create_group_chat', { name, member_uuids: members })

  return response.data
}
