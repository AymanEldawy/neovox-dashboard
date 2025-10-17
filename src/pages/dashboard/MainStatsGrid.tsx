import {
    ArrowDownRight,
    ArrowUpRight,
    Briefcase,
    TrendingDown,
    TrendingUp,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {getStats} from "@/services/dashboardService.ts";

interface Stats {
    users_count: number;
    plans_count: number;
    total_deposits_approved: number;
    total_deposits_pending: number;
    total_withdrawals_approved: number;
    total_withdrawals_pending: number;
}

const MainStatsGrid = () => {
    const [stats, setStats] = useState<Stats>({
        users_count: 0,
        plans_count: 0,
        total_deposits_approved: 0,
        total_deposits_pending: 0,
        total_withdrawals_approved: 0,
        total_withdrawals_pending: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStats();
                console.log(JSON.stringify(response.data,null,2));
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };
        fetchStats();
    }, []);

    const growthData = {
        users: { value: 12.5, isPositive: true },
        deposits: { value: 8.3, isPositive: true },
        withdrawals: { value: 5.2, isPositive: true },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                            growthData.users.isPositive ? "bg-green-500/30" : "bg-red-500/30"
                        }`}
                    >
                        {growthData.users.isPositive ? (
                            <ArrowUpRight className="w-4 h-4" />
                        ) : (
                            <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span className="text-sm font-bold">{growthData.users.value}%</span>
                    </div>
                </div>
                <p className="text-blue-100 text-sm mb-1">Total Users</p>
                <p className="text-4xl font-bold">{stats.users_count}</p>
            </div>

            {/* Active Investments */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <Briefcase className="w-6 h-6" />
                    </div>
                </div>
                <p className="text-purple-100 text-sm mb-1">Active Investments</p>
                <p className="text-4xl font-bold">{stats.plans_count}</p>
            </div>

            {/* Total Deposits */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                            growthData.deposits.isPositive ? "bg-green-700/30" : "bg-red-500/30"
                        }`}
                    >
                        {growthData.deposits.isPositive ? (
                            <ArrowUpRight className="w-4 h-4" />
                        ) : (
                            <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span className="text-sm font-bold">{growthData.deposits.value}%</span>
                    </div>
                </div>
                <p className="text-green-100 text-sm mb-1">Total Deposits</p>
                <p className="text-4xl font-bold">${stats.total_deposits_approved}</p>
            </div>

            {/* Total Withdrawals */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <TrendingDown className="w-6 h-6" />
                    </div>
                    <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                            growthData.withdrawals.isPositive ? "bg-green-500/30" : "bg-red-500/30"
                        }`}
                    >
                        {growthData.withdrawals.isPositive ? (
                            <ArrowUpRight className="w-4 h-4" />
                        ) : (
                            <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span className="text-sm font-bold">{growthData.withdrawals.value}%</span>
                    </div>
                </div>
                <p className="text-orange-100 text-sm mb-1">Total Withdrawals</p>
                <p className="text-4xl font-bold">${stats.total_withdrawals_approved}</p>
            </div>
        </div>
    );
};

export default MainStatsGrid;