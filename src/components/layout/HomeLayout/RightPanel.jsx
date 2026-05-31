import { useChatStore } from '../../../store/useChatStore'
import { useRef, useEffect } from 'react'

const RightPanel = ({ uuid }) => {
  const chat_uuid = uuid?.uuid
  const chats = useChatStore((state) => state.chats)
  const addMessage = useChatStore((state) => state.addMessage)

  const messages = chats[chat_uuid]?.messages || []

  const sendMessage = () => {
    const messageInput = document.getElementById('message-input')
    const message = messageInput.value.trim()
    if (!message) return

    addMessage(chat_uuid, {
      uuid: Date.now().toString(),
      text: message,
      user_uuid: 'user1',
      user_name: 'F.F.G.',
    })
    messageInput.value = ''
  }

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

  if (chat_uuid) {
    return (
      <div className="flex flex-col h-screen bg-[#0B0C14] text-white font-sans">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700 bg-[#0B0C14]">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-semibold">{chats[chat_uuid]?.chat_name}</h1>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#0B0C14]"
          ref={messagesRef}
          onScroll={handleScroll}
        >
          <div className="flex flex-col items-start gap-4">
            {messages.map((msg) => (
              <div className="max-w-xl" key={msg.uuid}>
                <p className="text-sm font-medium text-gray-400 mb-1">{msg.user_name}</p>
                <div className="bg-gray-800 text-white rounded-2xl px-4 py-3 shadow-sm">
                  <p className="text-sm leading-6">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 p-4 md:p-6 bg-[#0B0C14]">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              id="message-input"
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
      <div className="flex min-h-screen justify-center items-center bg-[#0B0C14] text-white">
        <p className="text-2xl w-56 h-12 text-center bg-gray-800 rounded-2xl border border-gray-700 flex items-center justify-center">
          Select the chat
        </p>
      </div>
    )
  }
}

export default RightPanel
