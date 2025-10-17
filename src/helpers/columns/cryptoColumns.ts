import { createColumnHelper } from "@tanstack/react-table";
import type { CryptoCurrency } from "@/types/type_crypto";

const columnHelper = createColumnHelper<CryptoCurrency>();

export const cryptoColumns = [
    columnHelper.accessor("currency", {
        header: "Currency",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("networks", {
        header: "Networks",
        cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("address", {
        header: "Status",
        cell: (info) => (Object.values(info.getValue()).some((addr) => addr?.isActive) ? "Active" : "Inactive"),
    }),
];