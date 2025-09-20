import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const userMissionColumns = [
  columnHelper.accessor('userId', {
    header: 'User ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('missionId', {
    header: 'Mission ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('progress', {
    header: 'Progress',
    cell: info => info.getValue() || 0,
  }),
  columnHelper.accessor('assignedAt', {
    header: 'Assigned At',
    cell: info => info.getValue() || 'N/A',
  }),
];