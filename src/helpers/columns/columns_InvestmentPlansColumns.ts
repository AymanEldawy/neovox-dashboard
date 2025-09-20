import { createColumnHelper } from '@tanstack/react-table';
import { CreateInvestmentPlanDto } from '../types/investmentPlans';

const columnHelper = createColumnHelper<CreateInvestmentPlanDto>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('minAmount', {
    header: 'Minimum Amount',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('maxAmount', {
    header: 'Maximum Amount',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('returnRate', {
    header: 'Return Rate',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('duration', {
    header: 'Duration',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: info => info.getValue() || 'N/A',
  }),
];