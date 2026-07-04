import { create } from 'zustand'

import {
  getFriends,
  listFriendRequests,
  myListFriendRequests,
  removeFriend,
  cancelRequest,
  acceptRequest,
  sendRequest,
} from '../api/friends'

export const useFriendsStore = create((set, get) => ({
  friends: [],
  incoming: [],
  outgoing: [],

  loading: false,

  async loadFriends() {
    set({ loading: true })

    const friends = await getFriends()

    set({
      friends,
      loading: false,
    })
  },

  async loadIncoming() {
    const incoming = await listFriendRequests()

    set({ incoming })
  },

  async loadOutgoing() {
    const outgoing = await myListFriendRequests()

    set({ outgoing })
  },

  async deleteFriend(public_id) {
    await removeFriend(public_id)

    set((state) => ({
      friends: state.friends.filter((f) => f.public_id !== public_id),
    }))
  },

  async cancelRequest(public_id, type) {
    await cancelRequest(public_id)

    set((state) => ({
      outgoing: state.incoming.filter((r) => r.public_id !== public_id),
    }))
    set((state) => ({
      incoming: state.outgoing.filter((r) => r.public_id !== public_id),
    }))
  },

  async acceptRequest(public_id) {
    await acceptRequest(public_id)

    set((state) => ({
      incoming: state.incoming.filter((r) => r.public_id !== public_id),
    }))
    await get().loadFriends()
  },

  async sendRequest(public_id) {
    await sendRequest(public_id)

    await get().loadOutgoing()
  }
}))
