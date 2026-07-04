const INCOMING = 'incoming'
const OUTCOMING = 'outgoing'

export const FriendRequestCard = ({
  user,
  onAccept,
  onDecline,
  type = INCOMING, // incoming | outgoing
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
      <div className="flex flex-col">
        <span className="text-white font-medium">{user.name}</span>
        <span className="text-gray-400 text-sm">{user.public_id}</span>
      </div>

      <div className="flex gap-2">
        {type === INCOMING && (
          <>
            <button
              onClick={() => onAccept?.(user.public_id)}
              className="text-green-400 hover:text-green-300 text-sm"
            >
              Accept
            </button>

            <button
              onClick={() => onDecline?.(user.public_id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Decline
            </button>
          </>
        )}

        {type === OUTCOMING && (
          <button
            onClick={() => onDecline?.(user.public_id)}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}