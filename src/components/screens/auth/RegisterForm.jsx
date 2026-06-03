import React, { useState } from 'react'

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
	
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Создать аккаунт</h2>
      <input
        type="text"
        placeholder="Name"
        required
        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Пароль"
        required
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Подтвердить пароль"
        required
        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}
