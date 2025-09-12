
export const TableSkeleton = ({ columns }) => {
  let len = columns?.length ? columns : Array(8).fill(0);
  return (
    <>
      {len?.map((r, index) => (
        <tr key={index}>
          {Array(8)
            .fill(0)
            ?.map((item, i) => (
              <td key={i} className="border">
                <div className="w-full h-4 rounded-md bg-gray-100 dark:bg-[#ffffff20] animate-pulse " />{" "}
              </td>
            ))}
        </tr>
      ))}
    </>
  );
};
