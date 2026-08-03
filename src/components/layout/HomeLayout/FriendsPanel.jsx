import { useState, useEffect } from 'react'
import { useFriendsStore } from '../../../store/useFriendsStore'

import { AddFriendTab } from '../../friends/AddFriendTab'
import { FriendsNavbar } from '../../friends/FriendsNavbar'
import { IncomingTab } from '../../friends/IncomingTab'
import { MyFriendsTab } from '../../friends/MyFriendsTab'
import { OutgoingTab } from '../../friends/OutgoingTab'

import { useNavigationStore } from '../../../store/useNavigationStore'

import { FiAlignLeft } from 'react-icons/fi'

export const FriendsPanel = () => {
  const [activeTab, setActiveTab] = useState('my')
  const openMobileMenu = useNavigationStore((state) => state.openMobileMenu)

  useEffect(() => {
    if (activeTab === 'my') {
      useFriendsStore.getState().loadFriends()
    }
    if (activeTab === 'incoming') {
      useFriendsStore.getState().loadIncoming()
    }
    if (activeTab === 'outgoing') {
      useFriendsStore.getState().loadOutgoing()
    }
  }, [activeTab])

  return (
    <div>
      <div className="flex items-center mb-4 lg:p-6 border-b border-gray-700 bg-[#0B0C14]">
        <button
          onClick={openMobileMenu}
          className="lg:hidden p-2 rounded hover:bg-gray-700 transition-colors"
        >
          <FiAlignLeft className="text-3xl"/>
        </button>
        <h1 className="text-2xl">Friends</h1>
      </div>
      <div>
        <FriendsNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="mr-8">
        {activeTab === 'my' && <MyFriendsTab />}
        {activeTab === 'incoming' && <IncomingTab />}
        {activeTab === 'outgoing' && <OutgoingTab />}
        {activeTab === 'add' && <AddFriendTab />}
      </div>
    </div>
  )
}
