export function RangeDateColumnFilter({
  column: {
    getFilterValue,
    setFilterValue,
    columnDef: { header },
  },
}) {
  return (
    <div className="flex items-center gap-1">
      <input
        // value={values?.[0] || ""}
        type="date"
        onChange={(e) => {
          const val = e.target.value;
          setFilterValue((old = []) => [val, old[1]]);
        }}
        placeholder={`Min`}
        className="text-xs p-1 rounded-md border border-gray-300 bg-gray-50 min-w-[120px] outline-none transition-colors focus:border-blue-600"
      />
      to
      <input
        // value={values?.[1] || ""}
        type="date"
        onChange={(e) => {
          const val = e.target.value;
          setFilterValue((old = []) => [old[0], val]);
        }}
        placeholder={`Max`}
        className="text-xs p-1 rounded-md border border-gray-300 bg-gray-50 min-w-[120px] outline-none transition-colors focus:border-blue-600"
      />
    </div>
  );
}
