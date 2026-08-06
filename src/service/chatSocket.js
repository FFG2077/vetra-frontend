class ChatSocket {
  socket = null
  token = null
  listeners = new Map()
  handshakedChats = new Set()

  reconnectAttempts = 0
  reconnectTimer = null
  heartbeatInterval = null
  manualDisconnect = false
  isAuthenticated = false
  pendingHandshakes = new Set()

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
    }

    this.socket.onmessage = (event) => {
      if (this.socket !== socket) return // Ignore if the socket has changed (e.g., due to a reconnect)
      try {
        const msg = JSON.parse(event.data)

        // Handle authentication success
        if (msg.event === 'auth.ok') {
          this.isAuthenticated = true

          // If there are any pending handshakes, send them now
          this.pendingHandshakes.forEach((uuid) => {
            this.send({
              event: 'message.handshake',
              data: { chat_uuid: uuid },
            })
          })
          this.pendingHandshakes.clear()
          
          // Notify listeners that the socket is connected
          const connectedHandlers = this.listeners.get('connected')
          if (connectedHandlers) connectedHandlers.forEach((h) => h())

          // notify listeners that the socket is authenticated
          const handlers = this.listeners.get(msg.event)
          if (handlers) handlers.forEach((h) => h(msg.data))

          return
        }

        const handlers = this.listeners.get(msg.event)
        if (handlers) handlers.forEach((h) => h(msg.data))
      } catch (e) {
        console.error('WS parse error: ', e)
      }
    }

    this.socket.onclose = (event) => {
      // two sockets; only the current one should mutate state
      if (this.socket !== socket) return // Ignore if the socket has changed (e.g., due to a reconnect)
      console.log('CLOSE CODE:', event.code, 'REASON:', event.reason)
      this.isAuthenticated = false
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

    this.handshakedChats.add(chatUuid)

    if (!this.isAuthenticated) {
      this.pendingHandshakes.add(chatUuid)
      return
    }

    this.send({
      event: 'message.handshake',
      data: { chat_uuid: chatUuid },
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
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }

    this.listeners.get(event).push(handler)
  }

  off(event, handler) {
    const handlers = this.listeners.get(event)

    if (!handlers) return
    this.listeners.set(
      event,
      handlers.filter((h) => h !== handler),
    )
  }

  disconnect() {
    this.manualDisconnect = true
    this.isAuthenticated = false
    this.pendingHandshakes.clear()
    clearTimeout(this.reconnectTimer)
    this.stopHeartbeat()
    this.socket?.close()
    this.socket = null
    this.handshakedChats.clear()
  }
}

export const chatSocket = new ChatSocket()
