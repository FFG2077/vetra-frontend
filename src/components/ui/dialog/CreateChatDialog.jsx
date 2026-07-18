import AppDialog from './Dialog'
import { useState, useEffect } from 'react'
import { GroupNameInput } from './GroupNameInput'
import { FriendSelector } from './FriendSelector'
import { useFriendsStore } from '../../../store/useFriendsStore'

export default function CreateChatDialog({ open, onOpenChange }) {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState('')
  const [groupName, setGroupName] = useState('')

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

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title="Create chat">
      <FriendSelector
        selectedUsers={selectedUsers}
        onToggleUser={toggleUser}
        friends={friends}
        setSearch={setSearch}
        search={search}
        removeUser={removeUser}
      />
      {selectedUsers.length > 1 && <GroupNameInput value={groupName} onChange={setGroupName} />}

      <div className="flex justify-center gap-10 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {selectedUsers.length > 1 ? 'Create Group Chat' : 'Create Direct Chat'}
        </button>
      </div>
    </AppDialog>
  )
}
