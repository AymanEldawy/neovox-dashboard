import SEARCH_PARAMS from "@/data/searchParamsKeys";

import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TablePagination from "./TablePagination";
import { TableResizeBar } from "./TableResizeBar";
import { TableSkeleton } from "./TableSkeleton";

type CustomTableProps = {
  columns: any[];
  data: any[];
  isLoading: boolean;
  pageCount: number;
  meta?: any;
  name: string;
  containerClassName?: string;
  tableClassName?: string;
  tableHeadClassName?: string;
  thClassName?: string;
  tableBodyClassName?: string;
  tdClassName?: string;
}

const CustomTable = ({
  columns,
  data,
  isLoading,
  pageCount,
  meta = {},
}: CustomTableProps) => {
  const updateSearchParams = useUpdateSearchParams();
  const limitSearchParam = useCustomSearchParams(SEARCH_PARAMS.LIMIT);
  const pageSearchParam = useCustomSearchParams(SEARCH_PARAMS.PAGE);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    enableFilters: true,
    manualFiltering: true,
    getRowId: (row) => {
      // if (!!outerSelectedId) return outerSelectedId(row, relativeIndex, parent);
      return row?.id;
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex: 0, pageSize: limitSearchParam }) // Default state for function updaters
          : updater;

      console.log("Pagination changed", newPagination);

      updateSearchParams([
        {
          name: SEARCH_PARAMS.PAGE,
          value: newPagination.pageIndex + 1,
        },
        {
          name: SEARCH_PARAMS.LIMIT,
          value: newPagination.pageSize,
        },
      ]);

      return {
        ...newPagination,
        pageIndex: newPagination.pageIndex + 1,
        pageSize: limitSearchParam,
      };
    },
    manualPagination: true,
    pageCount,
    state: {
      pagination: {
        pageIndex: pageSearchParam - 1 || 0,
        pageSize: limitSearchParam || 10,
      },
    },
    meta: {
      ...meta,
    },
  });

  return (
    <>
      <div className="w-full">
        <div
          className={`rounded-lg border border-primary/20 dark:border-primary/30 overflow-hidden bg-background-light dark:bg-background-dark`}
        >
          <table
            className={`w-[${table.getTotalSize()}] w-full border-`}
          // style={{ width: table.getTotalSize() }}
          >
            <thead >
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id} className="bg-primary/10 dark:bg-primary/20">
                    {headerGroup.headers.map((header) => {
                      const headerText = flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      );
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          draggable={
                            !table.getState().columnSizingInfo.isResizingColumn
                          }
                          data-column-index={header.index}
                          onDragOver={(e) => {
                            e.preventDefault();
                          }}
                          style={{ width: header.getSize() }}
                          className={`px-6 py-4 text-sm font-medium text-background-dark dark:text-background-light`}
                          onClick={() => {
                            if (header.column.getCanSort())
                              header.column.getToggleSortingHandler();
                          }}
                        >
                          {/* {header.column.columnDef.header} */}
                          <div className="flex flex-col relative ltr:text-left rtl:text-right">
                            <span className="px-1 font-medium">
                              {" "}
                              {header.isPlaceholder
                                ? null
                                : typeof headerText === "string"
                                  ? headerText
                                  : flexRender(headerText, header.getContext())}
                            </span>
                          </div>
                          {header.column.getCanSort() && (
                            <span className="text-xs absolute ltr:right-2 top-1 inline-block invisible group-hover:visible cursor-pointer">
                              {/* <SortIcon className="w-4 h-4" /> */} {
                                header.column.getIsSorted() === "asc" ? (
                                  " 🔼"
                                ) : header.column.getIsSorted() === "desc" ? (
                                  " 🔽"
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                  </svg>
                                )}

                            </span>
                          )}
                          <TableResizeBar header={header} />
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody className={`divide-y divide-primary/20 dark:divide-primary/30`}>
              {isLoading ? (
                <TableSkeleton columns={columns} />
              ) : (
                <>
                  {data?.length ? (
                    table.getRowModel().rows.map((row) => {
                      return (
                        <tr
                          key={row.id}
                          className={`border-b last:border-none border-2 even:bg-gray-100 border-gray-100 text-sm`}
                        >
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <td
                                key={cell?.id}
                                className={`w-[${cell.column.getSize()}] px-6 py-4 text-sm font-medium text-background-dark dark:text-background-light`}
                                style={{ width: cell.column.getSize() }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="text-red-500 h-28 bg-white p-1 rounded-sm mt-2 capitalize font-medium">
                      <td
                        colSpan={columns?.length}
                        className="text-center relative py-1"
                      >
                        there is no data to display
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        {limitSearchParam && <TablePagination table={table} />}
      </div>
    </>
  );
};

export default CustomTable;
