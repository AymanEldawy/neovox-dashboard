// import useCustomSearchParams from "@/hooks/useCustomSearchParams";
// import {useQuery} from "@tanstack/react-query";
// import {useState} from "react";
// import CustomTable from "../tables/wrapper/CustomTable";
// import PaperHeader from "./PaperHeader";
// import {useNavigate} from "react-router-dom";
//
// const PaperLayout = ({
//                          name,
//                          queryFn,
//                          queryKey,
//                          columns,
//                          paperHeaderProps,
//                          showAddButton = false,
//                      }: PaperLayoutProps) => {
//     const navigate = useNavigate();
//     const pageSearchParam = +useCustomSearchParams("page") || 1;
//     const limitSearchParam = +useCustomSearchParams("limit") || 50;
//     const [pageCount, setPageCount] = useState(1);
//
//     const {isLoading, isFetching, data} = useQuery({
//         queryKey: [queryKey, pageSearchParam, limitSearchParam],
//         queryFn: async () => {
//             const response = await queryFn(pageSearchParam, limitSearchParam);
//             if (response) return response.data;
//         },
//     });
//
//     return (
//         <div className="relative">
//             <PaperHeader paperHeaderProps={paperHeaderProps}/>
//
//             {showAddButton && (
//                 <div className="absolute top-0 right-0">
//                     <button
//                         onClick={() => navigate(`/${queryKey}/new`)}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//                     >
//                         + Add {name}
//                     </button>
//                 </div>
//             )}
//
//             <CustomTable
//                 columns={columns}
//                 data={!isLoading ? data : []}
//                 pageCount={pageCount}
//             />
//         </div>
//     );
// };
//
// export default PaperLayout;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { Plus, Trash2, Edit, Eye, MoreVertical } from "lucide-react";
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
                     }: PaperLayoutProps) => {
    const navigate = useNavigate();
    const pageSearchParam = +useCustomSearchParams("page") || 1;
    const limitSearchParam = +useCustomSearchParams("limit") || 50;
    const [pageCount, setPageCount] = useState(1);

    const { isLoading, isFetching, data, refetch } = useQuery({
        queryKey: [queryKey, pageSearchParam, limitSearchParam],
        queryFn: async () => {
            const response = await queryFn(pageSearchParam, limitSearchParam);
            if (response?.data) {
                // Calculate page count if pagination info is available
                if (response.meta?.total && limitSearchParam) {
                    setPageCount(Math.ceil(response.meta.total / limitSearchParam));
                }
                return response.data;
            }
            return [];
        },
    });

    // Add action column if enabled
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
                                <button
                                    onClick={() => navigate(`/${queryKey}/${row.original.id}`)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                    title="View"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => navigate(`/${queryKey}/${row.original.id}/edit`)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(row.original.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                ),
            },
        ]
        : columns;

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            // Handle delete logic
            console.log("Delete:", id);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{paperHeaderProps.name}</h1>
                            {paperHeaderProps.description && (
                                <p className="text-blue-100">{paperHeaderProps.description}</p>
                            )}
                        </div>
                        {showAddButton && (
                            <button
                                onClick={() => navigate(`/${queryKey}/new`)}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                Add {name}
                            </button>
                        )}
                    </div>

                    {/* Stats Cards (Optional) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-blue-100 text-sm mb-1">Total {paperHeaderProps.name}</p>
                            <p className="text-3xl font-bold">{data?.length || 0}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-blue-100 text-sm mb-1">Current Page</p>
                            <p className="text-3xl font-bold">{pageSearchParam}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
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
        </div>
    );
};

export default PaperLayout;