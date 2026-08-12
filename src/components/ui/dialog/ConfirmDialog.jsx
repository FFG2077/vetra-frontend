import AppDialog from './Dialog'

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' | 'warning' | 'default'
  onConfirm,
}) {
  const confirmStyles = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    default: 'bg-blue-600 hover:bg-blue-700',
  }

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title={title}>
      {description && <p className="text-gray-400 mb-6">{description}</p>}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onOpenChange(false)}
          className="px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700 transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            onConfirm()
            onOpenChange(false)
          }}
          className={`px-4 py-2 rounded-lg text-white transition-colors ${confirmStyles[variant]}`}
        >
          {confirmText}
        </button>
      </div>
    </AppDialog>
  )
}
