// @ts-nocheck
import { createColumnHelper } from '@tanstack/react-table';
import type { CreatePlanStateDto } from '@/types/types_planStates.ts';

const columnHelper = createColumnHelper<CreatePlanStateDto>();

export const columns = [
  columnHelper.accessor('planId', {
    header: 'Plan ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: info => info.getValue() || 'N/A',
  }),
];