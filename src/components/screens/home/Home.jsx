import React from 'react'
import LeftSidebar from '../../layout/HomeLayout/LeftPanel'
import MiddleSidebar from '../../layout/HomeLayout/MiddlePanel'
import RightSidebar from '../../layout/HomeLayout/RightPanel'

const Home = (uuid) => {
  return (
    <div className="grid grid-cols-[1fr_2fr_5fr] w-full h-full mt-4 ml-4 mr-4 gap-4">
      <LeftSidebar />
      <MiddleSidebar />
      <RightSidebar uuid={uuid}/>
    </div>
  )
}

export default Home
