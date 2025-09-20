import { createColumnHelper } from '@tanstack/react-table';
import { CreateUserBadgeDto } from '../types/userBadges';

const columnHelper = createColumnHelper<CreateUserBadgeDto>();

export const columns = [
  columnHelper.accessor('userId', {
    header: 'User ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('badgeId', {
    header: 'Badge ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('awardedAt', {
    header: 'Awarded At',
    cell: info => info.getValue() || 'N/A',
  }),
];