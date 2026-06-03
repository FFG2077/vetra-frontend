export default function Search({ children, className }) {
  return <input
  className={`w-full p-2 border border-gray-500 rounded ${className}`}
  placeholder={children} />
}
