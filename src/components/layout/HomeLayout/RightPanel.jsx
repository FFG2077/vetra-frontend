import { useChatStore } from '../../../store/useChatStore'
import { useAuthStore } from '../../../store/useAuthStore'
import { useRef, useEffect, useState } from 'react'
import { getMessages } from '../../../api/messages'
import { chatSocket } from '../../../service/chatSocket'
import { useNavigationStore } from '../../../store/useNavigationStore'
import AddUserDialog from '../../ui/dialog/AddUserDialog'

import { FiArrowLeft, FiUserPlus } from 'react-icons/fi'

const RightPanel = ({ uuid }) => {
  // messages
  const chat_uuid = uuid
  const chats = useChatStore((state) => state.chats)
  const addMessage = useChatStore((state) => state.addMessage)
  const setMessages = useChatStore((state) => state.setMessages)

  const messages = chats[chat_uuid]?.messages || []

  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (!message.trim()) return

    const msg = {
      public_id: Date.now().toString(),
      content: message,
      user_name: user_name,
      user_uuid: user_uuid,
    }

    addMessage(chat_uuid, msg)

    chatSocket.sendMessage(chat_uuid, message)
    setMessage('')
  }

  // scroll
  const messagesRef = useRef(null)
  const shouldAutoScroll = useRef(true)
  const scrollPosition = useRef({})

  const handleScroll = () => {
    const el = messagesRef.current

    if (!el) return

    shouldAutoScroll.current = el.scrollHeight - el.scrollTop - el.clientHeight < 100

    scrollPosition.current[chat_uuid] = el.scrollTop
  }

  useEffect(() => {
    const el = messagesRef.current

    if (!el) return

    if (shouldAutoScroll.current) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const el = messagesRef.current

    if (!el) return

    const savedPosition = scrollPosition.current[chat_uuid]

    if (savedPosition !== undefined) {
      el.scrollTop = savedPosition
    } else {
      el.scrollTop = el.scrollHeight
    }
  }, [chat_uuid])

  // websocket
  useEffect(() => {
    if (!chat_uuid) return

    chatSocket.handshake(chat_uuid)

    const handlerReconnect = () => {
      chatSocket.handshake(chat_uuid)
    }

    chatSocket.on('connected', handlerReconnect)

    const loadMessages = async () => {
      const messages = await getMessages(chat_uuid)

      setMessages(chat_uuid, messages)
    }

    loadMessages()

    return () => {
      chatSocket.off('connected', handlerReconnect)
    }
  }, [chat_uuid])

  useEffect(() => {
    const handler = (data) => {
      addMessage(data.chat_uuid, {
        public_id: Date.now().toString(),
        content: data.content,
        user_name: data.sender_name,
        user_uuid: data.sender_id,
      })
    }

    chatSocket.on('message.new', handler)

    return () => {
      chatSocket.off('message.new', handler)
    }
  }, [chat_uuid])

  // username, user_uuid
  const user_name = useAuthStore((state) => state.name)
  const user_uuid = useAuthStore((state) => state.uuid)

  // mobile navigation
  const closeMobileChat = useNavigationStore((state) => state.closeMobileChat)

  // add user
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  if (chat_uuid) {
    return (
      <div className="flex flex-col h-dvh bg-[#0B0C14] text-white font-sans">
        <div className="flex items-center justify-between p-2 lg:p-3 border-b border-gray-700 bg-[#0B0C14]">
          <div className="flex items-center gap-3">
            <button
              onClick={closeMobileChat}
              className="lg:hidden p-2 rounded hover:bg-gray-700 transition-colors"
            >
              <FiArrowLeft className="text-3xl" />
            </button>
            <h1 className="text-xl lg:text-2xl font-semibold">{chats[chat_uuid]?.name}</h1>
          </div>

          <div>
            {chats[chat_uuid].is_group == true && (
              <div>
                <button onClick={() => setIsAddUserOpen(true)}>
                  <FiUserPlus className="text-2xl" />
                </button>
                <AddUserDialog
                  open={isAddUserOpen}
                  onOpenChange={setIsAddUserOpen}
                  chat_uuid={chat_uuid}
                />
              </div>
            )}
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 bg-[#0B0C14]"
          ref={messagesRef}
          onScroll={handleScroll}
        >
          <div className="flex flex-col items-start gap-4">
            {messages.map((msg) => (
              <div className="max-w-xl" key={msg.public_id}>
                <p className="text-sm font-medium text-gray-400 mb-1">{msg.user_name}</p>
                <div className="bg-gray-800 text-white rounded-2xl px-4 py-3 shadow-sm">
                  <p className="text-sm leading-6">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 p-4 md:p-6 bg-[#0B0C14] pb-[max(20px,env(safe-area-inset-bottom))] mb-5">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage()
                }
              }}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors flex items-center justify-center"
              onClick={sendMessage}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex min-h-dvh justify-center items-center bg-[#0B0C14] text-white">
        <button
          onClick={closeMobileChat}
          className="absolute top-4 left-4 lg:hidden p-2 rounded hover:bg-gray-700 transition-colors"
        >
          <FiArrowLeft className="text-3xl" />
        </button>
        <p className="text-2xl w-56 h-12 text-center bg-gray-800 rounded-2xl border border-gray-700 flex items-center justify-center">
          Select the chat
        </p>
      </div>
    )
  }
}

export default RightPanel
