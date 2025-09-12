import SEARCH_PARAMS from "@/data/searchParamsKeys";
import useCustomSearchParams from "@/hook/useCustomSearchParams";
import { useLocalStorage } from "@/hook/useLocalStorageTables";
import useUpdateSearchParams from "@/hook/useUpdateSearchParams";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TableColumnVisibility from "./TableColumnVisibility";
import TablePagination from "./TablePagination";
import { TableResizeBar } from "./TableResizeBar";
import { TableSkeleton } from "./TableSkeleton";

let columnBeingDragged: number;

type CustomTableProps =  {
  columns: any[];
  data: any[];
  isLoading: boolean;
  rowSelection: any;
  setRowSelection: (updater: any) => void;
  pageCount: number;
  columnFilters: any[];
  setColumnFilters: (updater: any) => void;
  globalFilter: string;
  setGlobalFilter: (updater: string) => void;
  meta?: any;
  name: string;
  setOpenViability: (open: boolean) => void;
  openViability: boolean;
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
  rowSelection,
  setRowSelection,
  pageCount,
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
  meta = {},
  name,
  setOpenViability,
  openViability,
} : CustomTableProps) => {
  const { t } = useTranslation();
  const { t: headers } = useTranslation("columnsHeaders");
  const updateSearchParams = useUpdateSearchParams();
  const limitSearchParam = useCustomSearchParams(SEARCH_PARAMS.LIMIT);
  const pageSearchParam = useCustomSearchParams(SEARCH_PARAMS.PAGE);
  const { getTable, setTable } = useLocalStorage();
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return matchSorter(rows, filterValue, {
          keys: [(row) => row.values[id]],
        });
      },
      range: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue >= filterValue?.[0] && rowValue <= filterValue?.[1];
        });
      },
    }),
    []
  );

  useEffect(() => {
    let col = getTable(name);
    if (col) setColumnVisibility(col);
  }, []);

  useEffect(() => {
    if (Object.keys(columnVisibility).length) setTable(name, columnVisibility);
  }, [columnVisibility]);

  const table = useReactTable({
    columns,
    data,
    defaultColumn,
    filterTypes,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    enableFilters: true,
    manualFiltering: true,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: "onChange",
    columnResizeDirection: "both",
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
    autoResetPage: false,
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
      columnOrder,
      columnVisibility,
      pagination: {
        pageIndex: pageSearchParam - 1 || 0,
        pageSize: limitSearchParam || 10,
      },
    },
    meta: {
      ...meta,
    },
    // }, useFilters, useSortBy);
  });

  const onDragStart = (e) => {
    columnBeingDragged = Number(e.currentTarget.dataset.columnIndex);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const newPosition = Number(e.currentTarget.dataset.columnIndex);
    const currentCols = table.getVisibleLeafColumns().map((c) => c.id);
    const colToBeMoved = currentCols.splice(columnBeingDragged, 1);

    currentCols.splice(newPosition, 0, colToBeMoved[0]);
    table.setColumnOrder(currentCols);
  };

  return (
    <>
      <TableColumnVisibility
        name={name}
        open={openViability}
        onClose={() => setOpenViability(false)}
        table={table}
      />
      <div className="w-full">
        <div
          className={`relative overflow-x-auto w-full ${containerClassName}`}
        >
          <table
            className={`w-[${table.getTotalSize()}] w-full border-2 ${tableClassName}`}
            // style={{ width: table.getTotalSize() }}
          >
            <thead className={`${tableHeadClassName} bg-gray-100 text-xs`}>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
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
                          onDragStart={onDragStart}
                          onDragOver={(e) => {
                            e.preventDefault();
                          }}
                          onDrop={onDrop}
                          style={{ width: header.getSize() }}
                          className={` text-gray-700 whitespace-nowrap px-2 py-1 border-2 font-medium capitalize relative  group border-b border-gray-200 p-1 cursor-move ${thClassName}
                      
                      `}
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
                                ? t(headerText)
                                : flexRender(headerText, header.getContext())}
                            </span>

                            {header?.column.getCanFilter() && (
                              <>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.Filter,
                                      header.getContext()
                                    )}
                              </>
                            )}
                          </div>
                          {header.column.getCanSort() && (
                            <span className="text-xs absolute ltr:right-2 top-1 inline-block invisible group-hover:visible cursor-pointer">
                              <SortIcon className="w-4 h-4" />
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
            <tbody className={`${tableBodyClassName}`}>
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
                                className={`w-[${cell.column.getSize()}] py-1 whitespace-nowrap border px-3 ${tdClassName}`}
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
                    <tr className="text-red-500 h-28 bg-[#f1f1f1e8] p-1 rounded-sm mt-2">
                      <td
                        colSpan={columns?.length || 5}
                        className="ltr:text-left rtl:text-right relative py-1"
                      >
                        <span className="sticky left-1/2 -translate-x-1/2">
                          {t("empty_result")}
                        </span>
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
