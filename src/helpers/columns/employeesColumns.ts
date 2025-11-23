// @ts-nocheck
import { createColumnHelper } from "@tanstack/react-table";
import type { Employee } from "@/types/type_employee";

const columnHelper = createColumnHelper<Employee>();

export const employeeColumns = [
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => info.getValue() || "N/A",
  }),
];