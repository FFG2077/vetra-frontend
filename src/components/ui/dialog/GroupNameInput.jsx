export const GroupNameInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="groupName">Group Name</label>
        <input
          id="groupName"
          type="text"
          placeholder="Enter group name"
          className="w-full p-2 border border-gray-500 rounded"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
