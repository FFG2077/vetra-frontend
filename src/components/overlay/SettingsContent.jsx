import { useSettingsStore } from '../../store/useSettingsStore'

import { AccountSettings } from './tabs/AccountSettings'

export const SettingsContent = () => {
  const currentTab = useSettingsStore((state) => state.currentTab)

  switch (currentTab) {
    case 'account':
      return <AccountSettings />

    default:
      return <AccountSettings />
  }
}
