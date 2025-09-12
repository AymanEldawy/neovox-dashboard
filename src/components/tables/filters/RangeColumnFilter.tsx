export function RangeColumnFilter({
  column: {
    getFilterValue,
    setFilterValue,
    columnDef: { header },
  },
}) {
  return (
    <div style={{ display: "flex" }}>
      <input
        value={getFilterValue()?.[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilterValue((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min`}
        style={{
          width: "70px",
          marginRight: "0.5rem",
        }}
      />
      to
      <input
        value={getFilterValue()?.[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilterValue((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max`}
        style={{
          width: "70px",
          marginLeft: "0.5rem",
        }}
      />
    </div>
  );
}
