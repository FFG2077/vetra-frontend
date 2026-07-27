import { useState } from 'react'
import { useFriendsStore } from '../../store/useFriendsStore'
import toast from 'react-hot-toast'

export const AddFriendTab = () => {
  const [public_id, setPublicId] = useState('')

  const handleAdd = () => {
    if (!public_id) return toast.error('Please enter a public ID.')

    useFriendsStore.getState().sendRequest(public_id)
    setPublicId('')
    toast.success('Friend request sent!')
  }

  return (
    <div className="mt-3 flex flex-col gap-3">
      <input
        value={public_id}
        onChange={(e) => setPublicId(e.target.value)}
        placeholder="Enter user public ID"
        className="p-2 bg-gray-900 text-white rounded outline-none"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        Send request
      </button>
    </div>
  )
}