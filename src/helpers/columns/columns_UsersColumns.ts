// @ts-nocheck
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const userColumns = [
  columnHelper.accessor('username', {
    header: 'username',
    cell: info => info.getValue() || '@user',
    

  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('firstName', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('availableBalance', {
    header: 'Total Balance',
    cell: info => info.getValue() || 0,
  }),
  columnHelper.accessor('totalEarnings', {
    header: 'Total Earning',
    cell: info => info.getValue() || 0,
  })
];