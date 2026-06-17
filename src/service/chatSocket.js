class ChatSocket {
  socket = null
  token = null
  listeners = {}
  handshakedChats = new Set()

  connect(token) {
    if (this.sokcet) return
    this.token = token
    this.socket = new WebSocket('ws://localhost:8000/api/v1/ws')

    this.socket.onopen = () => {
      this.send({
        event: 'auth',
        data: {
          token: this.token,
        },
      })
      console.log('WebSocket connected')
    }

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data)

      const handler = this.listeners[msg.event]
      if (handler) {
        handler(msg.data)
      }
    }

    this.socket.onclose = () => {
      console.log('CLOSE CODE:', event.code)
      console.log('REASON:', event.reason)
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  send(payload) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload))
    }
  }

  handshake(chatUuid) {
    if (this.handshakedChats?.has(chatUuid)) returb

    this.send({
      event: 'message.handshake',
      data: {
        chat_uuid: chatUuid,
      },
    })
  }

  sendMessage(chatUuid, content) {
    this.send({
      event: 'message.send',
      data: {
        chat_uuid: chatUuid,
        content,
      },
    })
  }

  on(event, handler) {
    this.listeners[event] = handler
  }

  disconnect() {
    this.socket?.close()
  }
}

export const chatSocket = new ChatSocket()
