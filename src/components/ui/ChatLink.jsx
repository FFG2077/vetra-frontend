import { Link } from 'react-router-dom'

export default function ChatLink({ name, text, url, handleClick }) {
  const handleLinkClick = (e) => {
    if (handleClick) {
      handleClick(e)
    }
  }

  return (
    <>
      <Link to={url} onClick={handleLinkClick}>
        <div className="mt-4 mb-4 bg-gray-900/50 rounded p-4">
          <h2 className="text-xl">{name}</h2>
          <h3 className="text-gray-500 text-sm">{text}</h3>
        </div>
      </Link>
    </>
  )
}
