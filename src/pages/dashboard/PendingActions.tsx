import { AlertCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStats } from "@/services/dashboardService";

interface Stats {
    total_deposits_pending: number;
    total_withdrawals_pending: number;
}

const PendingActions = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<Stats>({
        total_deposits_pending: 0,
        total_withdrawals_pending: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };
        fetchStats();
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Deposits</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.total_deposits_pending}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/deposits")}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                        Review →
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Withdrawals</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.total_withdrawals_pending}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/withdrawals")}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                        Review →
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PendingActions;