import { FriendRequestCard } from './FriendRequestCard'
import { useFriendsStore } from '../../store/useFriendsStore'
import toast from 'react-hot-toast'

export const IncomingTab = () => {
  const requests = useFriendsStore((state) => state.incoming)

  const handleAccept = (public_id) => {
    useFriendsStore.getState().acceptRequest(public_id)
    toast.success('Friend request accepted!')
  }

  const handleDecline = (public_id) => {
    useFriendsStore.getState().cancelRequest(public_id, 'incoming')
    toast.success('Friend request declined!')
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      {requests.map((r) => (
        <FriendRequestCard
          key={r.public_id}
          user={r}
          type="incoming"
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      ))}
    </div>
  )
}