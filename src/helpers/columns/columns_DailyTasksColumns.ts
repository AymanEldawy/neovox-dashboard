// @ts-nocheck
import { createColumnHelper } from '@tanstack/react-table';
import type { CreateDailyTaskDto } from '@/types/types_dailyTasks.ts';

const columnHelper = createColumnHelper<CreateDailyTaskDto>();

export const columns = [
  columnHelper.accessor('userId', {
    header: 'User ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('reward', {
    header: 'Reward',
    cell: info => info.getValue() || 0,
  }),
  columnHelper.accessor('dueDate', {
    header: 'Due Date',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue() || 'N/A',
  }),
];