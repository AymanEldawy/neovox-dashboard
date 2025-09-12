export function SelectColumnFilter({
  column: {
    getFilterValue,
    setFilterValue,
    columnDef: { header },
  },
  options,
}) {
  return (
    <select
      value={getFilterValue()}
      onChange={(e) => {
        setFilterValue(e.target.value || undefined);
      }}
      className="text-xs p-1 rounded-md border border-gray-300 bg-gray-50 min-w-[120px] outline-none transition-colors focus:border-blue-600"
    >
      {/* <option value="">All</option> */}
      {options?.map((opt) => (
        <option value={opt.id} key={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}
