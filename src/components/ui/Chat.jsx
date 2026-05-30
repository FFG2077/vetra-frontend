export default function Chat({ name, text }) {
  return (
    <div className="mt-4 mb-4 bg-gray-900/50 rounded p-4 overflow-y-scroll">
      <h2 className="text-xl">{name}</h2>
      <h3 className="text-gray-500 text-sm">{text}</h3>
    </div>
  )
}
