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
import { Search, Filter ,RefreshCw, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

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
  onRefresh?: () => void;
  enableSearch?: boolean;
  enableFilter?: boolean;
  enableExport?: boolean;
}

const CustomTable = ({
                       columns,
                       data,
                       isLoading,
                       pageCount,
                       meta = {},
                       name,
                       onRefresh,
                       enableSearch = true,
                       enableFilter = false,
                       enableExport = false,
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
    getRowId: (row) => row?.id,
    onPaginationChange: (updater) => {
      const newPagination =
          typeof updater === "function"
              ? updater({ pageIndex: 0, pageSize: limitSearchParam })
              : updater;

      updateSearchParams([
        { name: SEARCH_PARAMS.PAGE, value: newPagination.pageIndex + 1 },
        { name: SEARCH_PARAMS.LIMIT, value: newPagination.pageSize },
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
    meta: { ...meta },
  });

  return (
      <div className="w-full space-y-4">
        {/* Table Actions Bar */}
        {(enableSearch || enableFilter || enableExport || onRefresh) && (
            <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 flex-1">
                {enableSearch && (
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                          type="text"
                          placeholder={`Search ${name}...`}
                          className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                      />
                    </div>
                )}
                {enableFilter && (
                    <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
                      <Filter className="w-4 h-4" />
                      <span className="text-sm font-medium">Filter</span>
                    </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        className="p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition"
                        title="Refresh"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                )}
                {/*{enableExport && (*/}
                {/*    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">*/}
                {/*      <Download className="w-4 h-4" />*/}
                {/*      <span className="text-sm font-medium">Export</span>*/}
                {/*    </button>*/}
                {/*)}*/}
              </div>
            </div>
        )}

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const headerText = flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                      );
                      const canSort = header.column.getCanSort();
                      const sortDirection = header.column.getIsSorted();

                      return (
                          <th
                              key={header.id}
                              colSpan={header.colSpan}
                              style={{ width: header.getSize() }}
                              className={`px-6 py-4 text-left text-sm font-semibold ${
                                  canSort ? "cursor-pointer select-none hover:bg-white/10" : ""
                              }`}
                              onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                          >
                            <div className="flex items-center gap-2">
                          <span>
                            {header.isPlaceholder
                                ? null
                                : typeof headerText === "string"
                                    ? headerText
                                    : flexRender(headerText, header.getContext())}
                          </span>
                              {canSort && (
                                  <span className="text-white/80">
                              {sortDirection === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                              ) : sortDirection === "desc" ? (
                                  <ChevronDown className="w-4 h-4" />
                              ) : (
                                  <ChevronsUpDown className="w-4 h-4" />
                              )}
                            </span>
                              )}
                            </div>
                            <TableResizeBar header={header} />
                          </th>
                      );
                    })}
                  </tr>
              ))}
              </thead>

              <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                  <TableSkeleton columns={columns} />
              ) : data?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                      <tr
                          key={row.id}
                          className={`transition hover:bg-blue-50 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className="px-6 py-4 text-sm text-gray-800"
                                style={{ width: cell.column.getSize() }}
                            >
                              {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                              )}
                            </td>
                        ))}
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td
                        colSpan={columns.length}
                        className="px-6 py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">No {name} found</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {limitSearchParam && data?.length > 0 && <TablePagination table={table} />}
      </div>
  );
};

export default CustomTable;