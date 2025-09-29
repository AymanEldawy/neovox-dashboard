import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<any>();

export const investmentPlanColumns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("tier", {
        header: "Tier",
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("minInvestment", {
        header: "Min Investment",
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor("maxInvestment", {
        header: "Max Investment",
        cell: info => `$${info.getValue()}`,
    }),
    columnHelper.accessor("dailyReturn", {
        header: "Daily Return (%)",
        cell: info => `${(info.getValue() * 100).toFixed(2)}%`,
    }),
    columnHelper.accessor("duration", {
        header: "Duration (days)",
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("isActive", {
        header: "Active",
        cell: info => (info.getValue() ? "✅" : "❌"),
    }),
];
