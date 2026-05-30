export default function Input({ children, className }) {
  return <input className={`w-full p-2 border border-gray-500 rounded ${className}`} placeholder={children} />
}
