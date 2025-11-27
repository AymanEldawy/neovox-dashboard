// @ts-nocheck
import { createColumnHelper } from "@tanstack/react-table";
import type { CryptoCurrency } from "@/types/type_crypto";

const columnHelper = createColumnHelper<CryptoCurrency>();

export const cryptoColumns = [
    columnHelper.accessor("currency", {
        header: "Currency",
        cell: (info) => (
            <div className= "flex items-center gap-2" >
            <span className="font-bold text-lg"> { info.getValue() } </span>
                </div>
        ),
    }),
columnHelper.accessor("networks", {
    header: "Networks",
    cell: (info) => {
        const networks = info.getValue();
        const addresses = info.row.original.address;

        return (
            <div className= "flex flex-wrap gap-2" >
            {
                networks.map((network) => {
                    const networkAddresses = addresses[network];
                    const count = Array.isArray(networkAddresses)
                        ? networkAddresses.length
                        : networkAddresses ? 1 : 0;
                    const activeCount = Array.isArray(networkAddresses)
                        ? networkAddresses.filter(a => a.isActive).length
                        : networkAddresses?.isActive ? 1 : 0;

                    return (
                        <span 
                                key= { network }
                    className = "inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                        { network }
                        < span className = "bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs" >
                            { activeCount } / { count }
                            </span>
                            </span>
                        );
            })}
</div>
            );
        },
    }),
columnHelper.accessor("address", {
    header: "Total Addresses",
    cell: (info) => {
        const addresses = info.getValue();
        let total = 0;
        Object.values(addresses).forEach((addr) => {
            if (Array.isArray(addr)) {
                total += addr.length;
            } else if (addr) {
                total += 1;
            }
        });
        return (
            <span className= "font-bold text-lg text-gray-800" > { total } </span>
            );
        },
    }),
columnHelper.accessor("address", {
    header: "Active Addresses",
    id: "activeAddresses",
    cell: (info) => {
        const addresses = info.getValue();
        let active = 0;
        Object.values(addresses).forEach((addr) => {
            if (Array.isArray(addr)) {
                active += addr.filter(a => a.isActive).length;
            } else if (addr?.isActive) {
                active += 1;
            }
        });
        return (
            <span className= "inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold" >
                    ✓ { active }
        </span>
            );
        },
    }),
];