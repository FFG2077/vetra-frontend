import { useState } from 'react'

import LeftLink from '../../ui/LeftLink'
import { Link } from 'react-router-dom'

import { IoSettingsOutline, IoClipboardOutline } from 'react-icons/io5'
import { useAuthStore } from '../../../store/useAuthStore'

import { copyToClipboard } from '../../../utils/copy'
import { useSettingsStore } from '../../../store/useSettingsStore'

const LeftPanel = ({ className = '' }) => {
  const public_id = useAuthStore((state) => state.public_id)
  const short_public_id = public_id ? public_id.slice(0, 8) : ''
  const name = useAuthStore((state) => state.name)

  const toggle = useSettingsStore((state) => state.toggle)

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

      <div className="flex mb-10 w-full bg-gray-900 rounded-2xl px-4 py-3 shadow-sm flex-col">
        <div className="text-white flex justify-between items-center mb-1">
          <span className="text-2xl">{name}</span>
          <IoSettingsOutline onClick={toggle} size={24} className="cursor-pointer hover:text-gray-300" />
        </div>
        <div className="flex w-full justify-between">
          <span
            onClick={() => copyToClipboard(public_id)}
            className="cursor-pointer hover:text-gray-300"
          >
            {short_public_id}...
          </span>
          <IoClipboardOutline
            size={20}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => copyToClipboard(public_id)}
          />
        </div>
      </div>
    </div>
  )
}

export default LeftPanel
