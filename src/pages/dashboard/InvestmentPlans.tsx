import { getPlanInvestmentStats } from "@/services/dashboardService";
import { useEffect, useState } from "react";

interface Plan {
    plan_id: string;
    plan_name: string;
    users_today: number;
    users_last_7d: number;
    users_last_30d: number;
    users_all_time: number;
    total_investment_amount: number;
}

const InvestmentPlans = () => {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getPlanInvestmentStats();
                // Sort plans by users_all_time in descending order
                const sortedPlans = response.data.sort((a: Plan, b: Plan) =>
                    b.users_all_time - a.users_all_time
                );
                setPlans(sortedPlans);
            } catch (error) {
                console.error("Failed to fetch plan stats:", error);
            }
        };
        fetchPlans();
    }, []);

    const getTierColor = (planName: string) => {
        const name = planName.toLowerCase();
        if (name.includes("starter")) return "bg-green-500";
        if (name.includes("bronze")) return "bg-amber-600";
        if (name.includes("silver")) return "bg-gray-400";
        if (name.includes("gold")) return "bg-yellow-500";
        if (name.includes("platinum")) return "bg-slate-300";
        if (name.includes("seed")) return "bg-blue-500";
        return "bg-gray-600"; // Default color for other plans
    };

    const MAX_INVESTMENT_THRESHOLD = 1000; // $1000 threshold for full progress bar

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Top Plans</h2>
            <div className="space-y-4">
                {plans.slice(0, 5).map((plan) => (
                    <div key={plan.plan_id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${getTierColor(plan.plan_name)}`} />
                                <span className="text-sm font-semibold text-gray-700">{plan.plan_name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{plan.users_all_time} users</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getTierColor(plan.plan_name)}`}
                                style={{
                                    width: `${Math.min((plan.total_investment_amount / MAX_INVESTMENT_THRESHOLD) * 100, 100)}%`
                                }}
                            />
                        </div>
                        <p className="text-xs font-bold text-gray-600">
                            ${Number(plan.total_investment_amount).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestmentPlans;