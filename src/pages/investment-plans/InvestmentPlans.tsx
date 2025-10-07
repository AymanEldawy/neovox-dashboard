import PaperLayout from '@/components/paper/PaperLayout.tsx';
import QUERY_KEYS from '@/data/queryKays.ts';
import { investmentPlanColumns } from '@/helpers/columns/columns_InvestmentPlans.ts';
import { getAllInvestmentPlans, deleteInvestmentPlan } from '@/services/investmentPlansService.ts';
import InvestmentPlanForm from '@/components/forms/container/investmentPlans/components_forms_InvestmentPlansForm.tsx';

const InvestmentPlans: React.FC = () => {
    return (
        <PaperLayout
            name="Investment Plan"
            queryKey={QUERY_KEYS.INVESTMENT_PLANS}
            queryFn={getAllInvestmentPlans}
            columns={investmentPlanColumns}
            handleDeleteSelected={async (ids: string[]) => {
                await Promise.all(ids.map(id => deleteInvestmentPlan(id)));
            }}
            FormWrapper={InvestmentPlanForm}
            paperHeaderProps={{
                name: "Investment Plans",
            }}
            showAddButton={true}
        />
    );
};

export default InvestmentPlans;
