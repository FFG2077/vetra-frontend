import { FriendRequestCard } from './FriendRequestCard'
import { useFriendsStore } from '../../store/useFriendsStore'
import toast from 'react-hot-toast'

export const OutgoingTab = () => {
  const requests = useFriendsStore((state) => state.outgoing)

  const handleCancel = (public_id) => {
    useFriendsStore.getState().cancelRequest(public_id, 'outgoing')

    toast.success('Friend request canceled!')
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      {requests.map((r) => (
        <FriendRequestCard key={r.public_id} user={r} type="outgoing" onDecline={handleCancel} />
      ))}
    </div>
  )
}
