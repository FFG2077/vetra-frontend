import Search from '../../ui/Search'
import Chat from '../../ui/Chat'
import ChatLink from '../../ui/ChatLink'
import { useChatStore } from '../../../store/useChatStore'
import { useEffect, useState, useMemo } from 'react'
import { getChats, renameChat, deleteChat } from '../../../api/chats'
import CreateChatDialog from '../../ui/dialog/CreateChatDialog'
import { useNavigationStore } from '../../../store/useNavigationStore'
import { useNavigate } from 'react-router-dom'

import { FiAlignLeft } from 'react-icons/fi'

const MiddlePanel = () => {
  const chats = useChatStore((state) => state.chats)
  const setChats = useChatStore((state) => state.setChats)
  const setCurrentChat = useChatStore((state) => state.setCurrentChat)
  const currentChat = useChatStore((state) => state.currentChat)
  const navigate = useNavigate()

  const openMobileChat = useNavigationStore((state) => state.openMobileChat)
  const openMobileMenu = useNavigationStore((state) => state.openMobileMenu)

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

  const renameChatInStore = useChatStore((state) => state.renameChat)
  const deleteChatInStore = useChatStore((state) => state.deleteChat)

  return (
    <>
      <CreateChatDialog open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen} />

      <div className="h-dvh flex flex-col">
        {/* <div className="flex flex-col"> */}
        <div className="p-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                className="lg:hidden p-2 rounded hover:bg-gray-700 transition-colors"
                onClick={openMobileMenu}
              >
                <FiAlignLeft className="text-3xl" />
              </button>
              <h1 className="text-2xl">Chats</h1>
            </div>
            <input
              className="w-full p-2 border border-gray-500 rounded"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          {filteredChats.length === 0 && (
            <div className="text-gray-500 text-center mt-4">No chats found.</div>
          )}
          {filteredChats.map((chat) =>(
              <ChatLink
                key={chat.public_id}
                name={chat.name}
                text={chat.is_group ? 'Group' : 'Direct'}
                onChange={(e) => setSearch(e.target.value)}
                handleClick={() => {
                  setCurrentChat(chat)
                  openMobileChat()
                }}
                handleRename={async (newName) => {
                  await renameChat(chat.public_id, newName)
                  renameChatInStore(chat.public_id, newName)
                }}
                handleDelete={async () => {
                  await deleteChat(chat.public_id)
                  deleteChatInStore(chat.public_id)
                  if (currentChat?.public_id === chat.public_id) {
                    setCurrentChat(null)
                    navigate('/home')
                  }
                }}
                chat_uuid={chat.public_id}
              />
            )
          )}
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
