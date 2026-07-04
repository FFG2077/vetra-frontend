import React from 'react'
import LeftSidebar from '../../layout/HomeLayout/LeftPanel'
import MiddleSidebar from '../../layout/HomeLayout/MiddlePanel'
import RightSidebar from '../../layout/HomeLayout/RightPanel'
import { useEffect } from 'react'
import { get_me } from '../../../api/user'
import { useAuthStore } from '../../../store/useAuthStore'
import { SettingsOverlay } from '../../overlay/SettingsOverlay'
import { FriendsPanel } from '../../layout/HomeLayout/FriendsPanel'
import { useNavigationStore } from '../../../store/useNavigationStore'

const Home = (uuid) => {
  const setUser = useAuthStore((state) => state.setUser)
  const activePage = useNavigationStore((state) => state.activePage)

  useEffect(() => {
    const loadUser = async () => {
      const user = await get_me()

      setUser(user)
    }
    loadUser()
  }, [])

  return (
    <div className="flex w-full h-full mt-4 ml-4 mr-4 gap-4 overflow-hidden">
      <LeftSidebar className="basis-64 lg:basis-80 shrink min-w-[220px]"/>

      {activePage === 'chats' && (
        <>
          <div className="flex-[2] min-w-0">
            <MiddleSidebar className="flex-1 min-w-0"/>
          </div>
          <div className="flex-[5] min-w-0">
            <RightSidebar className="basis-[420px] shrink min-w-[300px]" uuid={uuid} />
          </div>
        </>
      )}

      {activePage === 'friends' && (
        <div className="flex-1 min-w-0">
          <FriendsPanel />
        </div>
      )}

      <SettingsOverlay />
    </div>
  )
}

export default Home
