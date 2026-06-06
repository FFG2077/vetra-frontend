import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="auth-container">
      <div className="auth-menu">
        <div className="auth-form">
          {isLogin ? (
            <LoginForm onSwitchForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
