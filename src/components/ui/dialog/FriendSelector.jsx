export const FriendSelector = ({
  selectedUsers,
  onToggleUser,
  friends,
  setSearch,
  search,
  removeUser,
}) => {
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase()),
  )
  const selectedIds = new Set(selectedUsers.map((u) => u.public_id))

  return (
    <>
      <div className="border rounded p-2 flex flex-wrap gap-2">
        {selectedUsers.map((user) => (
          <div key={user.public_id} className="bg-gray-800/50 rounded px-2 py-1">
            {user.name}
            <button
              onClick={() => removeUser(user.public_id)}
              className="ml-2 hover:text-gray-500 bg-gray-700/50 rounded px-1 cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
        <input
          className="flex-1 outline-none"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && search === '') {
              removeUser(selectedUsers[selectedUsers.length - 1]?.public_id)
            }
            if (e.key === 'Enter' && filteredFriends.length > 0) {
              onToggleUser(filteredFriends[0])
              setSearch('')
            }
          }}
        />
      </div>
      <div className="border rounded p-2 mt-2 max-h-48 overflow-y-auto">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div
              key={friend.public_id}
              className="flex p-2 hover:bg-gray-600 cursor-pointer rounded justify-between"
              onClick={() => {
                onToggleUser(friend)
                setSearch('')
              }}
            >
              {friend.name}
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.has(friend.public_id)}
                  readOnly
                  className="w-4 h-4 pointer-events-none"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No friends found.</div>
        )}
      </div>
    </>
  )
}
