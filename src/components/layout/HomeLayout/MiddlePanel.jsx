import Search from '../../ui/Search'
import Chat from '../../ui/Chat'
import ChatLink from '../../ui/ChatLink'
import { useChatStore } from '../../../store/useChatStore'
import { useEffect, useState, useMemo } from 'react'
import { getChats } from '../../../api/chats'
import CreateChatDialog from '../../ui/dialog/CreateChatDialog'

const MiddlePanel = () => {
  const chats = useChatStore((state) => state.chats)
  const setChats = useChatStore((state) => state.setChats)
  const setCurrentChat = useChatStore((state) => state.setCurrentChat)

  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const data = await getChats()
      setChats(data)
    }
    load()
  }, [])

  const chatsArray = Object.values(chats || {})

  const filteredChats = useMemo(() => {
    return chatsArray.filter((chat) =>
      (chat.name || '').toLowerCase().includes(search.toLowerCase()),
    )
  }, [chats, search])

  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false)

  return (
    <>
      <CreateChatDialog open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen} />

      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex flex-col">
          <div>
            <h1 className="text-2xl">Chats</h1>
            <input
              className={`w-full p-2 border border-gray-500 rounded`}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            {filteredChats.length === 0 && (
              <div className="text-gray-500 text-center mt-4">No chats found.</div>
            )}
            {filteredChats.map((chat) => (
              <ChatLink
                key={chat.public_id}
                name={chat.name}
                text={chat.is_group ? 'Group' : 'Direct'}
                url={`/chat/${chat.public_id}`}
                onChange={(e) => setSearch(e.target.value)}
                handleClick={() => setCurrentChat(chat)}
              />
            ))}
          </div>
        </div>
        <button
          className="mb-10 m-2 p-2 border rounded cursor-pointer"
          onClick={() => setIsCreateChatOpen(true)}
        >
          + Create chat
        </button>
      </div>
    </>
  )
}

export default MiddlePanel
