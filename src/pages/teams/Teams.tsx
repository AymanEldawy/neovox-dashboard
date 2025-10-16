import PaperLayout from '@/components/paper/PaperLayout';
import QUERY_KEYS from '@/data/queryKays';
import React from 'react';
import {deleteTeam, getAllTeams} from "@/services/teamService.ts";
import {teamColumns} from "@/helpers/columns/coulmns_Teams.ts";

const Teams: React.FC = () => {
    return (
        <PaperLayout
            name="Teams"
            queryKey={QUERY_KEYS.TEAMS}
            queryFn={getAllTeams}
            columns={teamColumns}
            handleDeleteSelected={async (ids: string[]) => {
                await Promise.all(ids.map(id => deleteTeam(id)));
            }}
            paperHeaderProps={{
                name: "Teams",
            }}
            enableRowActions={true}
            showAddButton={false}

        />
    );
};

export default Teams;