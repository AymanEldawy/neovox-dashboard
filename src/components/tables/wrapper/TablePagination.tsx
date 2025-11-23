import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Rows3 } from "lucide-react";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import SEARCH_PARAMS from "@/data/searchParamsKeys";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";

const TablePagination = ({ table }: any) => {
  const updateSearchParams = useUpdateSearchParams();
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const limitSearchParam = +useCustomSearchParams(SEARCH_PARAMS.LIMIT) || 10;

 if (!pageCount || pageCount <= 0) return null;

  const pageSizeOptions = [10, 25, 50, 100, 500];

  const handlePageSizeChange = (newSize: number) => {
    updateSearchParams([
      { name: SEARCH_PARAMS.PAGE, value: "1" },
      { name: SEARCH_PARAMS.LIMIT, value: String(newSize) },
    ]);
  };

  const goToFirstPage = () => table.setPageIndex(0);
  const goToLastPage = () => table.setPageIndex(pageCount - 1);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(pageCount);
      } else if (currentPage >= pageCount - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = pageCount - 4; i <= pageCount; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(pageCount);
      }
    }

    return pages;
  };

  return (
      <div className="bg-gradient-to-r from-white via-blue-50/30 to-white rounded-2xl shadow-lg border-2 border-blue-100 p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Page Size Selector - Enhanced */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <Rows3 className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700 font-semibold">Show:</span>
            </div>
            <div className="relative">
              <select
                  value={limitSearchParam}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="appearance-none bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg px-4 py-2 pr-10 text-sm font-bold text-blue-700 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer transition-all"
              >
                {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size} rows
                    </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-600">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Page Info - Enhanced */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md">
            <div className="text-sm font-medium">
              Page{' '}
              <span className="text-xl font-bold mx-1">{currentPage}</span>
              <span className="text-blue-200">of</span>
              <span className="text-xl font-bold mx-1">{pageCount}</span>
            </div>
          </div>

          {/* Pagination Controls - Enhanced */}
          <nav className="flex items-center gap-2" aria-label="Pagination">
            {/* First Page */}
            <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="group p-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm hover:shadow-md"
                title="First Page"
            >
              <ChevronsLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Previous Page */}
            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="group p-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm hover:shadow-md"
                title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Page Numbers - Enhanced */}
            <div className="hidden sm:flex items-center gap-2">
              {renderPageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                      <span
                          key={`ellipsis-${index}`}
                          className="px-3 py-2 text-gray-400 font-bold text-lg"
                      >
                    ···
                  </span>
                  );
                }

                return (
                    <button
                        key={page}
                        onClick={() => table.setPageIndex(Number(page) - 1)}
                        className={`min-w-[44px] px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md transform hover:scale-105 ${
                            currentPage === page
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                      {page}
                    </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="group p-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm hover:shadow-md"
                title="Next Page"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Last Page */}
            <button
                onClick={goToLastPage}
                disabled={currentPage === pageCount}
                className="group p-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm hover:shadow-md"
                title="Last Page"
            >
              <ChevronsRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </nav>
        </div>

        {/* Mobile Page Numbers */}
        <div className="sm:hidden flex justify-center mt-4 gap-2 flex-wrap">
          {renderPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                  <span
                      key={`ellipsis-mobile-${index}`}
                      className="px-3 py-2 text-gray-400 font-bold"
                  >
                ···
              </span>
              );
            }

            return (
                <button
                    key={`mobile-${page}`}
                    onClick={() => table.setPageIndex(Number(page) - 1)}
                    className={`min-w-[44px] px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
                        currentPage === page
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                            : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                >
                  {page}
                </button>
            );
          })}
        </div>
      </div>
  );
};

export default TablePagination;