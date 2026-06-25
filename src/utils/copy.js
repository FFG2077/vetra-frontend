import toast from 'react-hot-toast'

export const copyToClipboard = async (text) => {
  if (!text) return

  try {
    await navigator.clipboard.writeText(text)

		toast.success('Copied to clipboard')
  } catch (e) {
		toast.error('Copy failed')
  }
}