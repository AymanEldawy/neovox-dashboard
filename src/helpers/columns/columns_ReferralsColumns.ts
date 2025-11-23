// @ts-nocheck
import { createColumnHelper } from '@tanstack/react-table';
import type { CreateReferralDto } from '@/types/types_referrals.ts';

const columnHelper = createColumnHelper<CreateReferralDto>();

export const columns = [
  columnHelper.accessor('referrerId', {
    header: 'Referrer ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('referredId', {
    header: 'Referred ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: info => info.getValue() || 'N/A',
  }),
];