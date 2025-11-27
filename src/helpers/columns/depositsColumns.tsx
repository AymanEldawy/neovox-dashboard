// @ts-nocheck
import { createColumnHelper } from "@tanstack/react-table";
import type { DepositDto } from "@/types/types_deposit";
import { Calendar, DollarSign } from "lucide-react";

const columnHelper = createColumnHelper<DepositDto>();

export const depositsColumns = [
    columnHelper.accessor("user", {
        header: "User",
        cell: (info) => {
            const user = info.getValue();
            return (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                        {user.firstName[0]}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => {
            const amount = info.getValue();
            const currency = info.row.original.currency;
            return (
                <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-lg text-gray-800">{amount}</span>
                    <span className="text-sm text-gray-500">{currency}</span>
                </div>
            );
        },
    }),
    columnHelper.accessor("method", {
        header: "Method",
        cell: (info) => (
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold capitalize">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
            const status = info.getValue();
            const configs = {
                pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
                confirmed: { bg: "bg-green-100", text: "text-green-700", label: "Confirmed" },
                rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
            };
            const config = configs[status] || configs.pending;
            return (
                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg font-semibold ${config.bg} ${config.text}`}>
                    {config.label}
                </span>
            );
        },
    }),
    columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => {
            const date = new Date(info.getValue());
            return (
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                        {date.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            );
        },
    }),
];
