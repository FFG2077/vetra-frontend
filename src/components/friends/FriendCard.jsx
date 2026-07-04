export const FriendCard = ({ friend, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
      <div className="flex flex-col">
        <span className="text-white font-medium">{friend.name}</span>
        <span className="text-gray-400 text-sm">{friend.public_id}</span>
      </div>

      <button
        onClick={() => onRemove?.(friend.public_id)}
        className="text-red-400 hover:text-red-300 text-sm"
      >
        Remove
      </button>
    </div>
  )
}