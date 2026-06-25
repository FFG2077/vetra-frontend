import { useEffect } from 'react'
import { useSettingsStore } from '../../store/useSettingsStore'
import { SettingsSidebar } from './SettingsSidebar'
import { SettingsContent } from './SettingsContent'

export const SettingsOverlay = () => {
  const isOpen = useSettingsStore((state) => state.isOpen)
  const close = useSettingsStore((state) => state.close)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [close])

  if (!isOpen) return null

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        backdrop-blur-sm
        z-50
        flex items-center justify-center
      "
      onClick={close}
    >
      <div
        className="
          w-[700px]
          h-[500px]
          bg-gray-900
          rounded-3xl
          border border-gray-800
          flex
          relative
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
            w-56
            border-r border-gray-800
            p-4
            flex
            flex-col
          "
        >
          <h2 className="text-xl text-white mb-6">Settings</h2>

          <SettingsSidebar />
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <SettingsContent />
        </div>

        <button
          onClick={close}
          className="
            absolute
            top-5 right-5
            text-gray-400
            hover:text-white
          "
        >
          ✕
        </button>
      </div>
    </div>
  )
}
