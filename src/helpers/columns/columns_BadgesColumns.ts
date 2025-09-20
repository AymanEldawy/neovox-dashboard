import { createColumnHelper } from '@tanstack/react-table';
import { CreateBadgeDto } from '../types/badges';

const columnHelper = createColumnHelper<CreateBadgeDto>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('imageUrl', {
    header: 'Image URL',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('criteria', {
    header: 'Criteria',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: info => info.getValue() || 'N/A',
  }),
];