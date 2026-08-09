import { Link } from 'react-router-dom'
import { FiMoreVertical } from 'react-icons/fi'
import ChatMenu from './chat/ChatMenu'

export default function ChatLink({
  name,
  text,
  handleClick,
  handleRename,
  handleDelete,
  chat_uuid,
}) {
  const handleLinkClick = (e) => {
    if (handleClick) {
      handleClick(e)
    }
  }

  return (
    <div className="relative mt-4 mb-4">
      <Link to={`/chat/${chat_uuid}`} onClick={handleLinkClick}>
        <div className="bg-gray-900/50 rounded p-4 pr-12">
          <h2 className="text-xl">{name}</h2>
          <h3 className="text-gray-500 text-sm">{text}</h3>
        </div>
      </Link>

      <div className="absolute top-1/2 right-0 -translate-y-1/2">
        <ChatMenu onRename={handleRename} onDelete={handleDelete} chatName={name} />
      </div>
    </div>
  )
}
