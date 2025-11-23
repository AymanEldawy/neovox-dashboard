// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { Plus, Trash2, Edit, Eye } from "lucide-react";
import CustomTable from "@/components/tables/wrapper/CustomTable.tsx";

type PaperLayoutProps = {
    name: string;
    queryFn: (page: number, limit: number) => Promise<any>;
    queryKey: string;
    columns: any[];
    paperHeaderProps: {
        name: string;
        description?: string;
    };
    showAddButton?: boolean;
    handleDeleteSelected?: (ids: string[]) => Promise<void>;
    FormWrapper?: () => JSX.Element;
    enableRowActions?: boolean;
    customActions?: (row: any) => JSX.Element;
    enableViewButton?: boolean;
    enableEditButton?: boolean;
    enableDeleteButton?: boolean;
};

const PaperLayout = ({
                         name,
                         queryFn,
                         queryKey,
                         columns,
                         paperHeaderProps,
                         showAddButton = true,
                         enableRowActions = true,
                         customActions,
                         handleDeleteSelected,
                         enableViewButton = true,
                         enableEditButton = true,
                         enableDeleteButton = true,
                     }: PaperLayoutProps) => {
    const navigate = useNavigate();
    const pageSearchParam = +useCustomSearchParams("page") || 1;
    const limitSearchParam = +useCustomSearchParams("limit") || 10;
    const [pageCount, setPageCount] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    const { isLoading, isFetching, data, refetch } = useQuery({
        queryKey: [queryKey, pageSearchParam, limitSearchParam],
        queryFn: async () => {
            try {
                const response = await queryFn(pageSearchParam, limitSearchParam);

                console.log("Backend Response:", response); // للتأكد من شكل الـ response

                // التعامل مع الـ response من الباك اند
                // الشكل المتوقع: { data: [...], meta: { total, page, limit } }
                if (response?.data) {
                    // حساب عدد الصفحات من الـ meta
                    if (response.meta?.total !== undefined) {
                        setTotalItems(response.meta.total);
                        const calculatedPageCount = Math.ceil(response.meta.total / limitSearchParam);
                        setPageCount(calculatedPageCount);
                    } else {
                        // إذا لم يكن هناك meta.total، استخدم طول الـ data
                        setPageCount(1);
                        setTotalItems(response.data.length);
                    }
                    return response.data;
                }

                // في حالة كان الـ response مباشر array
                if (Array.isArray(response)) {
                    setTotalItems(response.length);
                    setPageCount(1);
                    return response;
                }

                return [];
            } catch (error) {
                console.error("Error fetching data:", error);
                return [];
            }
        },
    });

    const enhancedColumns = enableRowActions
        ? [
            ...columns,
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }: any) => (
                    <div className="flex items-center gap-2">
                        {customActions ? (
                            customActions(row.original)
                        ) : (
                            <>
                                {enableViewButton && (
                                    <button
                                        onClick={() => navigate(`/${queryKey}/add/${row.original.id}`)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        title="View"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                )}
                                {enableEditButton && (
                                    <button
                                        onClick={() => navigate(`/${queryKey}/add/${row.original.id}`)}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                )}
                                {enableDeleteButton && (
                                    <button
                                        onClick={() => {
                                            setDeleteTargetId(row.original.id);
                                            setDeleteDialogOpen(true);
                                        }}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ),
            },
        ]
        : columns;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-2">
            <div className="max-w-7xl mx-auto space-y-3">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-4 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <h1 className="text-4xl font-bold mb-1">{paperHeaderProps.name}</h1>
                            {paperHeaderProps.description && (
                                <p className="text-blue-100">{paperHeaderProps.description}</p>
                            )}
                        </div>
                        {showAddButton && (
                            <button
                                onClick={() => navigate(`/${queryKey}/add`)}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                Add {name}
                            </button>
                        )}
                    </div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-blue-100 text-sm mb-1">Total {paperHeaderProps.name}</p>
                            <p className="text-3xl font-bold">{totalItems || 0}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-blue-100 text-sm mb-1">Current Page</p>
                            <p className="text-3xl font-bold">{pageSearchParam} / {pageCount}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-blue-100 text-sm mb-1">Items Per Page</p>
                            <p className="text-3xl font-bold">{limitSearchParam}</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <CustomTable
                    columns={enhancedColumns}
                    data={!isLoading && data ? data : []}
                    isLoading={isLoading || isFetching}
                    pageCount={pageCount}
                    name={name}
                    onRefresh={() => refetch()}
                    enableSearch={true}
                    enableExport={true}
                />
            </div>

            {/* Delete Confirmation Dialog */}
            {deleteDialogOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-6 text-gray-700">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                onClick={async () => {
                                    if (deleteTargetId && handleDeleteSelected) {
                                        await handleDeleteSelected([deleteTargetId]);
                                    }
                                    setDeleteDialogOpen(false);
                                    setDeleteTargetId(null);
                                    refetch();
                                }}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition"
                                onClick={() => {
                                    setDeleteDialogOpen(false);
                                    setDeleteTargetId(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaperLayout;