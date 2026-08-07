import React, { useState } from 'react'
import { register } from '../../../api/auth'
import { useAuthStore } from '../../../store/useAuthStore'

export const RegisterForm = ({ onSwitchForm }) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { setTokens } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await register(
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.confirmPassword,
      )

      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      })
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-md rounded-xl border border-slate-700 bg-slate-950 p-8 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold text-slate-100">Create Account</h2>
      <input
        type="text"
        value={registerData.name}
        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
        placeholder="Name"
        required
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:bg-slate-800"
      />
      <input
        type="email"
        value={registerData.email}
        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        placeholder="Email"
        required
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:bg-slate-800"
      />
      <input
        type="password"
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        placeholder="Password"
        required
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:bg-slate-800"
      />
      <input
        type="password"
        value={registerData.confirmPassword}
        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
        placeholder="Confirm Password"
        required
        className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500 focus:bg-slate-800"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-sky-600 px-4 py-3 text-base font-medium text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        Register
      </button>
      <div className="mt-4 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchForm}
          className="text-sky-500 hover:text-sky-400 transition"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}
