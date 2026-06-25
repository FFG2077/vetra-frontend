import { useSettingsStore } from '../../store/useSettingsStore'

export const SettingsSidebar = () => {
  const currentTab = useSettingsStore(state => state.currentTab)
  const setTab = useSettingsStore(state => state.setTab)

  return (
    <div className="w-52 border-gray-800 pr-4">

      <button
        onClick={() => setTab('account')}
        className={`
          w-full text-left px-4 py-3 rounded-xl

          ${currentTab === 'account'
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800'}
        `}
      >
        Account
      </button>
    </div>
  )
}