import Search from '../../ui/Search'
import Chat from '../../ui/Chat'
import ChatLink from '../../ui/ChatLink'
import { useChatStore } from '../../../store/useChatStore'
import { useState } from 'react'
import { useMemo } from 'react'

const MiddlePanel = () => {
  const chats = useChatStore((state) => state.chats)
  const setCurrentChat = useChatStore((state) => state.setCurrentChat)

  const handleClick = (e, newText) => {
    e.preventDefault()
    setContent(newText)
  }

  const [search, setSearch] = useState('')

  const chatsList = Object.values(chats)
  // const filteredChats = chatsList.filter((chat) =>
    // chat.chat_name.toLowerCase().includes(search.toLowerCase()),
  // )

  const filteredChats = useMemo(() => {
    return Object.values(chats).filter((chat) => chat.chat_name.toLowerCase().includes(search.toLowerCase()))
  }, [chats, search])

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-2xl">Chats</h1>
        {/* <Search className="mt-5">Search</Search> */}
        <input
          className={`w-full p-2 border border-gray-500 rounded`}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {filteredChats.map((chat) => (
          <ChatLink
            key={chat.uuid}
            name={chat.chat_name}
            text={chat.description}
            url={`/chat/${chat.uuid}`}
            onChange={(e) => setSearch(e.target.value)}
            handleClick={() => setCurrentChat(chat)}
          />
        ))}
      </div>
    </div>
  )
}

export default MiddlePanel
