import toast from 'react-hot-toast'

export const copyToClipboard = async (text) => {
  if (!text) return

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text

      document.body.appendChild(textarea)
      textarea.select()

      document.execCommand('copy')

      textarea.remove()
    }

    toast.success('Copied to clipboard')
  } catch (e) {
    console.log(e)
    toast.error('Copy failed')
  }
}
