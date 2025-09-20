import { createColumnHelper } from '@tanstack/react-table';
import { CreateMissionDto } from '../types/missions';

const columnHelper = createColumnHelper<CreateMissionDto>();

export const columns = [
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
  columnHelper.accessor('difficulty', {
    header: 'Difficulty',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: info => info.getValue() || 'N/A',
  }),
];