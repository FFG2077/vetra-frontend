import React, { useState } from 'react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="auth-container">
      <div className="auth-menu">
        <button className={`auth-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>
          Вход
        </button>
        <button
          className={`auth-btn ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Регистрация
        </button>
      </div>

      <div className="auth-form">
        {isLogin ? (
          <form>
            <h2>Вход в аккаунт</h2>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Пароль" required />
            <button type="submit">Войти</button>
          </form>
        ) : (
          <form>
            <h2>Создать аккаунт</h2>
            <input type="text" placeholder="Имя" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Пароль" required />
            <input type="password" placeholder="Подтвердить пароль" required />
            <button type="submit">Зарегистрироваться</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Auth
