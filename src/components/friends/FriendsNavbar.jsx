export const FriendsNavbar = ({ activeTab, setActiveTab }) => {
  const baseBtn = 'px-3 py-1 rounded transition-colors duration-200 text-sm sm:text-base'

  const activeBtn = 'bg-gray-700 text-white'
  const inactiveBtn = 'text-gray-400 hover:text-white hover:bg-gray-800'

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
      <button
        onClick={() => setActiveTab('my')}
        className={`${baseBtn} ${activeTab === 'my' ? activeBtn : inactiveBtn}`}
      >
        My friends
      </button>

      <button
        onClick={() => setActiveTab('incoming')}
        className={`${baseBtn} ${activeTab === 'incoming' ? activeBtn : inactiveBtn}`}
      >
        Incoming
      </button>

      <button
        onClick={() => setActiveTab('outgoing')}
        className={`${baseBtn} ${activeTab === 'outgoing' ? activeBtn : inactiveBtn}`}
      >
        Outgoing
      </button>

      <button
        onClick={() => setActiveTab('add')}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Add friend
      </button>
    </div>
  )
}
