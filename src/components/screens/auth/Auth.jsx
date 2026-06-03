import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="auth-container">
      <div className="auth-menu">
        <div className="auth-form">{isLogin ? <LoginForm /> : <RegisterForm />}</div>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className={`auth-btn ${!isLogin ? 'active' : ''} mx-2 bg-blue-500 text-white px-4 py-2 rounded`}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </div>
    </div>
  )
}

export default Auth
