import React from 'react';
import PaperLayout from '@/components/paper/PaperLayout.tsx';
import QUERY_KEYS from '@/data/queryKays.ts';
import { getAllWithdrawals, deleteWithdrawals } from '@/services/withdrawalsService.ts';
import { withdrawalsColumns } from '@/helpers/columns/withdrawalsColumns.tsx';

const WithdrawalsTable: React.FC = () => {
    return (
        <PaperLayout
            name="Withdrawal"
            queryKey={QUERY_KEYS.WITHDRAWALS}
            queryFn={getAllWithdrawals}
            columns={withdrawalsColumns}
            handleDeleteSelected={async (ids: string[]) => {
                await Promise.all(ids.map(id => deleteWithdrawals(id)));
            }}
            paperHeaderProps={{
                name: "Withdrawals Management",
                description: "Review and process withdrawal requests",
            }}
            showAddButton={false}
            enableEditButton={false}
            enableViewButton={true}
        />
    );
};

export default WithdrawalsTable;