import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Auth from './components/screens/auth/Auth'
import Home from './components/screens/home/Home'
import { useAuthStore } from './store/useAuthStore'
import { chatSocket } from './service/chatSocket'
import { Toaster } from 'react-hot-toast'

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
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,

          style: {
            background: '#111827',
            color: '#fff',
            border: '1px solid #374151',
          },

          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },

          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={accessToken ? <Navigate to="/home" /> : <Navigate to="/auth" />}
          />

          <Route path="/auth" element={accessToken ? <Navigate to="/home" /> : <Auth />} />

          <Route path="/home" element={accessToken ? <Home /> : <Navigate to="/auth" />} />

          <Route
            path="/chat/:uuid"
            element={accessToken ? <HomeWithUuid /> : <Navigate to="/auth" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
