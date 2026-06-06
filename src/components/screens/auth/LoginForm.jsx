import React, { useState } from 'react'
import { login } from '../../../api/auth'
import { useAuthStore } from '../../../store/useAuthStore'

export const LoginForm = ({ onSwitchForm }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const { setAccessToken } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await login(loginData.email, loginData.password)

      setAccessToken(data.access_token)
    } catch (error) {
      console.error('Error occurred while logging in:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-md rounded-xl border border-slate-700 bg-slate-950 p-8 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold text-slate-100">Sign in to your account</h2>
      <input
        type="email"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        placeholder="Email"
        required
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:bg-slate-800"
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:bg-slate-800"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-sky-600 px-4 py-3 text-base font-medium text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        Sign in
      </button>
      <div className="mt-4 text-center text-sm text-slate-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchForm}
          className="text-sky-500 hover:text-sky-400 transition"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
