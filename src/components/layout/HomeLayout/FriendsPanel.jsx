import { useState, useEffect } from 'react'
import { useFriendsStore } from '../../../store/useFriendsStore'

import { AddFriendTab } from '../../friends/AddFriendTab'
import { FriendsNavbar } from '../../friends/FriendsNavbar'
import { IncomingTab } from '../../friends/IncomingTab'
import { MyFriendsTab } from '../../friends/MyFriendsTab'
import { OutgoingTab } from '../../friends/OutgoingTab'

export const FriendsPanel = () => {
  const [activeTab, setActiveTab] = useState('my')

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
      <h1 className="text-2xl">Friends</h1>
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
