import * as Dialog from '@radix-ui/react-dialog'

export default function AppDialog({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            w-full
            max-w-lg
            -translate-x-1/2
            -translate-y-1/2
            rounded-xl
            border
            z-[101]
            border-gray-700
            bg-neutral-900
            p-6
            shadow-2xl
            focus:outline-none
          "
        >
          <Dialog.Title className="mb-4 text-xl font-semibold">{title}</Dialog.Title>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
