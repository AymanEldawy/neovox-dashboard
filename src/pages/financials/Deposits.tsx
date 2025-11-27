import React from 'react';
import PaperLayout from '@/components/paper/PaperLayout.tsx';
import QUERY_KEYS from '@/data/queryKays.ts';
import { getAllDeposits, deleteDeposit } from '@/services/depositsService.ts';
import { depositsColumns } from '@/helpers/columns/depositsColumns.tsx';

const DepositsTable: React.FC = () => {
    return (
        <PaperLayout
            name="Deposit"
            queryKey={QUERY_KEYS.DEPOSITS}
            queryFn={getAllDeposits}
            columns={depositsColumns}
            handleDeleteSelected={async (ids: string[]) => {
                await Promise.all(ids.map(id => deleteDeposit(id)));
            }}
            paperHeaderProps={{
                name: "Deposits Management",
                description: "Review and manage user deposits",
            }}
            showAddButton={false}
            enableEditButton={false}
            enableViewButton={true}
        />
    );
};

export default DepositsTable;
