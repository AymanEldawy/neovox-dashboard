import PaperLayout from '@/components/paper/PaperLayout';
import QUERY_KEYS from '@/data/queryKays';
import { userColumns } from '@/helpers/columns/columns_UsersColumns';
import { getAllUsers } from '@/services/';
import React from 'react';

const Teams: React.FC = () => {
    return (
        <PaperLayout
            name="Teams"
            queryKey={QUERY_KEYS.TEAMS}
            queryFn={get}
            columns={userColumns}
            handleDeleteSelected={() => Promise.resolve()}
            paperHeaderProps={{
                name: "Users",
            }}
        />
    );
};

export default Teams;