import LeftLink from '../../ui/LeftLink'
import { Link } from 'react-router-dom'

const LeftPanel = ({ className = '' }) => {
  return (
    <div className={`min-h-screen w-full md:w-40 lg:w-80 flex flex-col p-4 sm:p-2 ${className}`}>
      <Link to="/home" className="inline-flex items-center gap-2">
        <h1 className="text-3xl">Vetra</h1>
        <span className="bg-blue-500 text-white px-2 py-1 rounded">BETA</span>
      </Link>

      <div className="flex flex-col flex-1 text-center sm:text-left">
        <div className="flex mt-12 flex-col gap-3">
          <LeftLink url="/home">Chats</LeftLink>
          <LeftLink url="/friends">Friends</LeftLink>
        </div>

        <div className="mt-auto mb-6 text-center">
          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-500 text-sm border-2 rounded-2xl m-3 p-3">
              For invited people only
            </span>
          </div>
          <h3 className="text-gray-500 text-xl">Beta V0.1.0</h3>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
