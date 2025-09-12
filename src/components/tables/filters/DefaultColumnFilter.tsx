import { DebouncedInput } from "@/components/forms/fields";

export function DefaultColumnFilter({
  column: {
    getFilterValue,
    setFilterValue,
    columnDef: { header },
  },
}) {
  return (
    <DebouncedInput
      className="p-1 text-xs border rounded-md"
      value={getFilterValue() || ""}
      onChange={(value) => {
        setFilterValue(value || "");
      }}
      debounce={400}
      placeholder={`Search ${header} records...`}
    />
  );
}
