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

export const renameChat = async (chat_uuid, new_name) => {
  try {
    const response = await api.put('/chat/rename_chat', null, {
      params: { chat_uuid, new_name },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteChat = async (chat_uuid) => {
  try {
    const response = await api.delete('/chat/delete_chat', { params: { chat_uuid } })

    return response.data
  } catch (error) {
    throw error
  }
}

export const inviteUser = async (user_uuid, chat_uuid) => {
  try {
    const response = await api.post('/chat/invite_user', null, {
      params: { user_uuid, chat_uuid },
    })

    return response.data
  } catch (error) {
    throw error
  }
}
