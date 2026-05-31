import Input from '../../ui/Input'
import Chat from '../../ui/Chat'
import ChatLink from '../../ui/ChatLink'
import { useChatStore } from '../../../store/useChatStore'

const MiddlePanel = () => {
  const chats = useChatStore((state) => state.chats)
  const setCurrentChat = useChatStore((state) => state.setCurrentChat)

  const handleClick = (e, newText) => {
    e.preventDefault()
    setContent(newText)
  }

  // const [search, setSearch] = useState('')



  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-2xl">Chats</h1>
        <Input className="mt-5">Search</Input>
      </div>
      <div>
        {Object.values(chats).map((chat) => (
          <ChatLink
            key={chat.uuid}
            name={chat.chat_name}
            text={chat.description}
            url={`/chat/${chat.uuid}`}
            handleClick={() => setCurrentChat(chat)}
          />
        ))}
      </div>
    </div>
  )
}

export default MiddlePanel
