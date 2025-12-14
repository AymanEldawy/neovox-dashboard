import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaperLayout from '@/components/paper/PaperLayout.tsx';
import QUERY_KEYS from '@/data/queryKays.ts';
import { deleteCrypto, getAllCryptos } from '@/services/cryptoService.ts';
import { cryptoColumns } from '@/helpers/columns/cryptoColumns.tsx';

const CryptoManagement: React.FC = () => {
    const navigate = useNavigate();

    // @ts-ignore
    return (
        <PaperLayout
            name="Crypto"
            queryKey={QUERY_KEYS.CRYPTOS}
            queryFn={getAllCryptos}
            columns={cryptoColumns}
            handleDeleteSelected={async (ids: string[]) => {
                await Promise.all(ids.map(id => deleteCrypto(id)));
            }}
            onEdit={(row: any) => {
                navigate(`/cryptos/edit/${row.id}`);
            }}
            paperHeaderProps={{
                name: "Cryptocurrencies",
            }}
            showAddButton={false}
            enableEditButton={true}
            enableViewButton={false}
        />
    );
};

export default CryptoManagement;