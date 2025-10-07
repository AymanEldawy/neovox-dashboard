import PaperLayout from '@/components/paper/PaperLayout.tsx';
import QUERY_KEYS from '@/data/queryKays.ts';
import {deleteMission, getAllMissions} from "@/services/missionsService.ts";
import {missionColumns} from "@/helpers/columns/columns_MissionsColumns.ts";
import TaskManagementForm from "@/pages/missions/AddMission.tsx";

const InvestmentPlans: React.FC = () => {
    return (
        <PaperLayout
            name="Mission"
            queryKey={QUERY_KEYS.MISSIONS}
            queryFn={getAllMissions}
            columns={missionColumns}
            handleDeleteSelected={async (ids: string[]) => {
                await Promise.all(ids.map(id => deleteMission(id)));
            }}
            FormWrapper={TaskManagementForm}
            paperHeaderProps={{
                name: "Missions",
            }}
            showAddButton={true}
        />
    );
};

export default InvestmentPlans;
