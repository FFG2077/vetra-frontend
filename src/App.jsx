import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Auth from './components/screens/auth/Auth'
import Home from './components/screens/home/Home'

const HomeWithUuid = () => {
  const { uuid } = useParams()
  return <Home uuid={uuid} />
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:uuid" element={<HomeWithUuid />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
