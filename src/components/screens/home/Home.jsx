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
  // const activePage = useNavigationStore((state) => state.activePage)
  const { activePage, isMobileMenuOpen, isMobileChatOpen, closeMobileMenu } = useNavigationStore()

  useEffect(() => {
    const loadUser = async () => {
      const user = await get_me()

      setUser(user)
    }
    loadUser()
  }, [])

  return (
    <div
      className="
        flex
        h-dvh
        overflow-hidden
        p-2
        md:p-4
        gap-2
        md:gap-4
        "
    >
      {isMobileMenuOpen && (
        <div
          className="
          fixed
          inset-0
          bg-black/50
          z-40
        lg:hidden
        "
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`
        fixed
        z-50

        ${isMobileMenuOpen ? 'block' : 'hidden'}

        lg:block
        lg:static
        `}
      >
        <LeftSidebar />
      </div>

      {activePage === 'chats' && (
        <>
          {/* <div className="flex-[2] min-w-0">
            <MiddleSidebar className="flex-1 min-w-0" />
          </div>
          <div className="flex-[5] min-w-0">
            <RightSidebar className="basis-[420px] shrink min-w-[300px]" uuid={uuid} />
          </div> */}
          <div
            className={`
            flex-1

            ${isMobileChatOpen ? 'hidden' : 'block'}

            lg:block
          `}
          >
            <MiddleSidebar />
          </div>
          <div
            className={`
            flex-1

            ${isMobileChatOpen ? 'block' : 'hidden'}

            lg:block
        `}
          >
            <RightSidebar uuid={uuid} />
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
