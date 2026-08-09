import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FiMoreVertical } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AppDialog from '../dialog/Dialog'
import { useState } from 'react'
import ConfirmDialog from '../ConfirmDialog'
import { useChatStore } from '../../../store/useChatStore'

export default function ChatMenu({ onRename, onDelete, chatName }) {
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [newName, setNewName] = useState('')

  const handleRenameSubmit = async () => {
    if (!newName.trim()) return

    try {
      await onRename(newName)
      setNewName('')
      setIsRenameOpen(false)
    } catch (error) {
      toast.error(error.response?.data?.detail ?? 'Failed to rename chat. Please try again.')
    }
  }
  const handleDeleteConfirm = async () => {
    try {
      await onDelete()
    } catch (error) {
      toast.error('Failed to delete chat. Please try again.')
    }
  }

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <FiMoreVertical />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[160px] bg-gray-900 rounded-md p-1 shadow-lg border border-gray-700"
            sideOffset={5}
            align="end"
          >
            <DropdownMenu.Item
              className="px-3 py-2 rounded cursor-pointer outline-none hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation()
                setIsRenameOpen(true)
              }}
            >
              Rename
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="px-3 py-2 rounded cursor-pointer outline-none text-red-400 hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation()
                setIsDeleteOpen(true)
              }}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <AppDialog open={isRenameOpen} onOpenChange={setIsRenameOpen} title="Rename Chat">
        <p className="text-gray-400 mb-6">Rename {chatName}?</p>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new chat name"
          className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameSubmit(e)
            if (e.key === 'Escape') setIsRenameOpen(false)
          }}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsRenameOpen(false)}
            className="px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRenameSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Rename
          </button>
        </div>
      </AppDialog>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete chat"
        description={`Are you sure you want to delete "${chatName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
