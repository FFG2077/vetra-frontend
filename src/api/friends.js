import { api } from './axios'

export const getFriends = async () => {
  try {
    const response = await api.get('/friendship/get_friends')

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const sendRequest = async (friend_uuid) => {
  try {
    const response = await api.post('/friendship/send_request', null, { params: { friend_uuid } })

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const acceptRequest = async (friend_uuid) => {
  try {
    const response = await api.post('/friendship/accept_request', null, { params: { friend_uuid } })

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const cancelRequest = async (friend_uuid) => {
  try {
    const response = await api.delete('/friendship/cancel_request', { params: { friend_uuid } })

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const removeFriend = async (friend_uuid) => {
  try {
    const response = await api.delete('/friendship/remove_friend', { params: { friend_uuid } })

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const listFriendRequests = async () => {
  try {
    const response = await api.post('/friendship/list_friend_requests')

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const myListFriendRequests = async () => {
  try {
    const response = await api.get('/friendship/my_list_friend_requests')

    return response.data
  } catch (error) {
    console.error(error)
  }
}
