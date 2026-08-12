import AppDialog from './Dialog'
import { useState, useEffect } from 'react'
import { FriendSelector } from './FriendSelector'
import { useFriendsStore } from '../../../store/useFriendsStore'
import toast from 'react-hot-toast'
import { inviteUser } from '../../../api/chats'

export default function AddUserDialog({ open, onOpenChange, chat_uuid }) {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState('')

  const friends = useFriendsStore((state) => state.friends)
  const loadFriends = useFriendsStore((state) => state.loadFriends)

  useEffect(() => {
    if (!open) return

    loadFriends()
  }, [open])

  const toggleUser = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      const exists = prevSelectedUsers.some((u) => u.public_id === user.public_id)

      if (exists) {
        return prevSelectedUsers.filter((u) => u.public_id !== user.public_id)
      }

      return [...prevSelectedUsers, user]
    })
  }

  const removeUser = (publicId) => {
    setSelectedUsers((prev) => prev.filter((user) => user.public_id !== publicId))
  }

  const handleInviteUser = async () => {
    if (selectedUsers.length === 0) {
      return toast.error('Please select at least one user to invite user.')
    }

    try {
      await Promise.all(selectedUsers.map((u) => inviteUser(u.public_id, chat_uuid)))

      toast.success(selectedUsers.length > 1 ? 'Users were added' : 'User was added')
			setSelectedUsers([])
      onOpenChange(false)
    } catch (error) {
      toast.error(error.response?.data?.detail ?? 'Failed to invite user(s)')
    }
  }

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title="Add user in chat">
      <FriendSelector
        selectedUsers={selectedUsers}
        onToggleUser={toggleUser}
        friends={friends}
        setSearch={setSearch}
        search={search}
        removeUser={removeUser}
      />
      <div className="flex justify-center gap-10 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleInviteUser()}
        >
          {selectedUsers.length > 1 ? 'Add users' : 'Add user'}
        </button>
      </div>
    </AppDialog>
  )
}
