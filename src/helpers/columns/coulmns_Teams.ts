// @ts-nocheck
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const teamColumns = [
    columnHelper.accessor('name', {
        header: 'Team Name',
        cell: info => info.getValue() ,


    }),
    columnHelper.accessor('tier', {
        header: 'Tier',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('maxMembers', {
        header: 'Max Members',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('currentMembers', {
        header: 'Current Members',
        cell: info => info.getValue() || 0,
    }),
    columnHelper.accessor('isActive', {
        header: 'Status',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: info => info.getValue() || 0,
    })
];