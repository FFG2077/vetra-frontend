import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div>
        <div>
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
