import {createColumnHelper} from '@tanstack/react-table';
import type {CreateMissionDto} from "@/types/types_missions.ts";

const columnHelper = createColumnHelper<CreateMissionDto>();

export const missionColumns = [
    columnHelper.accessor('title', {
        header: 'Title',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('type', {
        header: 'Type',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('rewards', {
        header: 'Reward',
        cell: info => info.getValue() || 0,
    }),
    columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: info => info.getValue() || 'N/A',
    }),
];