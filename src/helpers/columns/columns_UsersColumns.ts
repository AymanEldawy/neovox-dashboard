import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const userColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
    

  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: info => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'N/A',
  }),
];