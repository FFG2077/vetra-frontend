class ChatSocket {
  socket = null
  token = null
  listeners = {}
  handshakedChats = new Set()

  reconnectAttempts = 0
  reconnectTimer = null
  heartbeatInterval = null
  manualDisconnect = false

  connect(token) {
    if (this.socket) return
    this.manualDisconnect = false
    this.token = token

    const socket = new WebSocket(import.meta.env.VITE_WS_URL)
    this.socket = socket

    this.socket.onopen = () => {
      if (this.socket !== socket) return // Ignore if the socket has changed (e.g., due to a reconnect)
      this.reconnectAttempts = 0

      this.send({ event: 'auth', data: { token: this.token } })
      this.startHeartbeat()

      // Notify listeners that the socket is connected
      const handlers = this.listeners['connected']
      if (handlers) handlers.forEach((h) => h())
    }

    this.socket.onmessage = (event) => {
      if (this.socket !== socket) return // Ignore if the socket has changed (e.g., due to a reconnect)
      try {
        const msg = JSON.parse(event.data)

        const handlers = this.listeners[msg.event]
        if (handlers) handlers.forEach((h) => h(msg.data))
      } catch (e) {
        console.error('WS parse error: ', e)
      }
    }

    this.socket.onclose = (event) => {
      if (this.socket !== socket) return // Ignore if the socket has changed (e.g., due to a reconnect)
      console.log('CLOSE CODE:', event.code, 'REASON:', event.reason)
      this.stopHeartbeat()
      this.socket = null
      this.handshakedChats.clear()

      if (!this.manualDisconnect) this.scheduleReconnect()
    }

    this.socket.onerror = (error) => {
      if (this.socket !== socket) return // Ignore if the socket has changed (e.g., due to a reconnect)
      console.error('WebSocket error:', error)
    }
  }

  scheduleReconnect() {
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 15000) // Exponential backoff with a max of 15 seconds
    this.reconnectAttempts++
    clearTimeout(this.reconnectTimer)
    this.reconnectTimer = setTimeout(() => this.connect(this.token), delay)
  }

  startHeartbeat() {
    this.stopHeartbeat()
    this.heartbeatInterval = setInterval(() => {
      this.send({ event: 'ping' })
    }, 25000) // Send a ping every 25 seconds
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatInterval)
    this.heartbeatInterval = null
  }

  send(payload) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload))
    }
  }

  handshake(chatUuid) {
    if (this.handshakedChats.has(chatUuid)) return

    this.send({
      event: 'message.handshake',
      data: { chat_uuid: chatUuid },
    })
    this.handshakedChats.add(chatUuid)
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
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(handler)
  }

  off(event, handler) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter((h) => h !== handler)
  }

  disconnect() {
    this.manualDisconnect = true
    clearTimeout(this.reconnectTimer)
    this.stopHeartbeat()
    this.socket?.close()
    this.socket = null
    this.handshakedChats.clear()
  }
}

export const chatSocket = new ChatSocket()
