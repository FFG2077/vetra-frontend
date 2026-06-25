import { useAuthStore } from '../../../store/useAuthStore'

export const AccountSettings = () => {
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="flex-1 pl-6">
      <h2 className="text-2xl text-white mb-6">
        Account
      </h2>

      <button
        onClick={logout}
        className="
          px-5 py-3
          rounded-xl
          bg-red-600
          hover:bg-red-700
          text-white
        "
      >
        Logout
      </button>
    </div>
  )
}