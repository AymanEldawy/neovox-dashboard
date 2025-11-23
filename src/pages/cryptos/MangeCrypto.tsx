import React from 'react';
import PaperLayout from '@/components/paper/PaperLayout.tsx';
import QUERY_KEYS from '@/data/queryKays.ts';
import { deleteCrypto, getAllCryptos } from '@/services/cryptoService.ts';
import { cryptoColumns } from '@/helpers/columns/cryptoColumns.ts';
import CryptoManagementForm from './AddCryptos';

const CryptoManagement: React.FC = () => {
    return (
        <PaperLayout
            name="Crypto"
            queryKey={QUERY_KEYS.CRYPTOS}
            queryFn={getAllCryptos}
            columns={cryptoColumns}
            handleDeleteSelected={async (ids: string[]) => {
                await Promise.all(ids.map(id => deleteCrypto(id)));
            }}
            FormWrapper={CryptoManagementForm}
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