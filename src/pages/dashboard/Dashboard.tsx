import {RefreshCw} from "lucide-react";
import MainStatsGrid from "./MainStatsGrid.tsx";
import PendingActions from "./PendingActions.tsx";
import RecentUsers from "./RecentUsers.tsx";
import TasksOverview from "./TasksOverview.tsx";
import InvestmentPlans from "./InvestmentPlans.tsx";

const AdminDashboard = () => {
    // const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="p-2 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition"
                        >
                            <RefreshCw className="w-5 h-5 text-gray-600"/>
                        </button>
                    </div>
                </div>

                <MainStatsGrid/>
                <PendingActions/>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <RecentUsers/>
                    <InvestmentPlans/>
                </div>
                <TasksOverview/>

            </div>
        </div>

    );
};

export default AdminDashboard;