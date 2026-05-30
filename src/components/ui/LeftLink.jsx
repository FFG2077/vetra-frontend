import { Link } from 'react-router-dom'

export default function LeftLink({ children, url }) {
  return (
    <>
      <div className="bg-blue-500/50 p-1 rounded">
        <Link to={url} className="block text-center text-blue-300 hover:font-bold mt-1 mb-1">
          {children}
        </Link>
      </div>
    </>
  )
}
