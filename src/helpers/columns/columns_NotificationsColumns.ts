import { createColumnHelper } from '@tanstack/react-table';
import { CreateNotificationDto } from '../types/notifications';

const columnHelper = createColumnHelper<CreateNotificationDto>();

export const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('message', {
    header: 'Message',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('recipientId', {
    header: 'Recipient ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: info => info.getValue() || 'N/A',
  }),
];