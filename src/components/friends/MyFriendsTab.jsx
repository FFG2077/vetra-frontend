import { FriendCard } from './FriendCard'
import { useFriendsStore } from '../../store/useFriendsStore' 
import toast from 'react-hot-toast'

export const MyFriendsTab = () => {
  const friends = useFriendsStore((state) => state.friends)

  const handleRemove = (public_id) => {
    useFriendsStore.getState().deleteFriend(public_id)
    toast.success('Friend removed!')
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      {friends.map((f) => (
        <FriendCard key={f.public_id} friend={f} onRemove={handleRemove} />
      ))}
    </div>
  )
}