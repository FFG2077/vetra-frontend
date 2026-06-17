import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Auth from './components/screens/auth/Auth'
import Home from './components/screens/home/Home'
import { useAuthStore } from './store/useAuthStore'
import { chatSocket } from './service/chatSocket'

const HomeWithUuid = () => {
  const { uuid } = useParams()
  return <Home uuid={uuid} />
}

const App = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  useEffect(() => {
    if (!accessToken) return

    chatSocket.connect(accessToken)

    return () => chatSocket.disconnect()
  }, [accessToken])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={accessToken ? <Navigate to="/home" /> : <Navigate to="/auth" />} />

        <Route path="/auth" element={accessToken ? <Navigate to="/home" /> : <Auth />} />

        <Route path="/home" element={accessToken ? <Home /> : <Navigate to="/auth" />} />

        <Route
          path="/chat/:uuid"
          element={accessToken ? <HomeWithUuid /> : <Navigate to="/auth" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
