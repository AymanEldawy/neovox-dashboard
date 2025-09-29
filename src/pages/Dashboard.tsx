import {useState} from "react";
import {
    Activity,
    AlertCircle,
    ArrowDownRight,
    ArrowUpRight,
    Award,
    Briefcase,
    CheckCircle,
    Clock,
    Download,
    RefreshCw,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
} from "lucide-react";

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState("7days");

    // Statistics Data
    const stats = {
        totalUsers: 1247,
        activeInvestments: 342,
        totalDeposits: 45280,
        totalWithdrawals: 23150,
        pendingDeposits: 5,
        pendingWithdrawals: 3,
        completedTasks: 8956,
        totalRevenue: 12450,
    };

    const growthData = {
        users: {value: 12.5, isPositive: true},
        deposits: {value: 8.3, isPositive: true},
        withdrawals: {value: 5.2, isPositive: true},
        revenue: {value: 15.8, isPositive: true},
    };

    const recentUsers = [
        {
            name: "Marwan Bakri",
            email: "marwanbakri3010@gmail.com",
            balance: 391,
            status: "verified",
            joinedDays: 2,
        },
        {
            name: "Sarah Ahmed",
            email: "sarah.ahmed@example.com",
            balance: 245,
            status: "verified",
            joinedDays: 5,
        },
        {
            name: "Ahmed Hassan",
            email: "ahmed.h@example.com",
            balance: 520,
            status: "pending",
            joinedDays: 1,
        },
    ];

    const investmentPlans = [
        {name: "Starter Spark", users: 145, revenue: 1450, tier: "starter"},
        {name: "Bronze Rush", users: 89, revenue: 4450, tier: "bronze"},
        {name: "Silver Wave", users: 67, revenue: 6700, tier: "silver"},
        {name: "Gold Empire", users: 34, revenue: 17000, tier: "gold"},
        {name: "Platinum Elite", users: 7, revenue: 14000, tier: "platinum"},
    ];

    const recentActivities = [
        {
            type: "deposit",
            user: "Marwan Bakri",
            amount: 150,
            time: "5 minutes ago",
            status: "pending",
        },
        {
            type: "withdrawal",
            user: "Ahmed Hassan",
            amount: 200,
            time: "12 minutes ago",
            status: "completed",
        },
        {
            type: "investment",
            user: "Sarah Ahmed",
            amount: 500,
            time: "25 minutes ago",
            status: "active",
        },
        {
            type: "task",
            user: "Marwan Bakri",
            amount: 50,
            time: "1 hour ago",
            status: "completed",
        },
    ];

    const TasksData = [
        {type: "Article", completed: 3245, pending: 156, total: 3401},
        {type: "Survey", completed: 2890, pending: 234, total: 3124},
        {type: "Check-in", completed: 2821, pending: 89, total: 2910},
    ];

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
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        >
                            <option value="24hours">Last 24 Hours</option>
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="90days">Last 90 Days</option>
                        </select>
                        <button
                            className="p-2 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition">
                            <RefreshCw className="w-5 h-5 text-gray-600"/>
                        </button>
                        <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                            <Download className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Users className="w-6 h-6"/>
                            </div>
                            <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                                    growthData.users.isPositive ? "bg-green-500/30" : "bg-red-500/30"
                                }`}
                            >
                                {growthData.users.isPositive ? (
                                    <ArrowUpRight className="w-4 h-4"/>
                                ) : (
                                    <ArrowDownRight className="w-4 h-4"/>
                                )}
                                <span className="text-sm font-bold">{growthData.users.value}%</span>
                            </div>
                        </div>
                        <p className="text-blue-100 text-sm mb-1">Total Users</p>
                        <p className="text-4xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                    </div>

                    {/* Active Investments */}
                    <div
                        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Briefcase className="w-6 h-6"/>
                            </div>
                            <Activity className="w-6 h-6 opacity-50"/>
                        </div>
                        <p className="text-purple-100 text-sm mb-1">Active Investments</p>
                        <p className="text-4xl font-bold">{stats.activeInvestments}</p>
                    </div>

                    {/* Total Deposits */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <TrendingUp className="w-6 h-6"/>
                            </div>
                            <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                                    growthData.deposits.isPositive ? "bg-green-700/30" : "bg-red-500/30"
                                }`}
                            >
                                {growthData.deposits.isPositive ? (
                                    <ArrowUpRight className="w-4 h-4"/>
                                ) : (
                                    <ArrowDownRight className="w-4 h-4"/>
                                )}
                                <span className="text-sm font-bold">{growthData.deposits.value}%</span>
                            </div>
                        </div>
                        <p className="text-green-100 text-sm mb-1">Total Deposits</p>
                        <p className="text-4xl font-bold">${stats.totalDeposits.toLocaleString()}</p>
                    </div>

                    {/* Total Withdrawals */}
                    <div
                        className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <TrendingDown className="w-6 h-6"/>
                            </div>
                            <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                                    growthData.withdrawals.isPositive ? "bg-green-500/30" : "bg-red-500/30"
                                }`}
                            >
                                {growthData.withdrawals.isPositive ? (
                                    <ArrowUpRight className="w-4 h-4"/>
                                ) : (
                                    <ArrowDownRight className="w-4 h-4"/>
                                )}
                                <span className="text-sm font-bold">{growthData.withdrawals.value}%</span>
                            </div>
                        </div>
                        <p className="text-orange-100 text-sm mb-1">Total Withdrawals</p>
                        <p className="text-4xl font-bold">${stats.totalWithdrawals.toLocaleString()}</p>
                    </div>
                </div>

                {/* Pending Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-yellow-600"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Pending Deposits</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.pendingDeposits}</p>
                                </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                Review →
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-orange-600"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Pending Withdrawals</p>
                                    <p className="text-2xl font-bold text-gray-800">{stats.pendingWithdrawals}</p>
                                </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                Review →
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        ${stats.totalRevenue.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                                <ArrowUpRight className="w-4 h-4"/>
                                {growthData.revenue.value}%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Users */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
                            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                View All →
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentUsers.map((user, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-800">${user.balance}</p>
                                        <div className="flex items-center gap-2">
                      <span
                          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                              user.status === "verified"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {user.status}
                      </span>
                                            <span className="text-xs text-gray-500">{user.joinedDays}d ago</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Investment Plans Performance */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Top Plans</h2>
                        <div className="space-y-4">
                            {investmentPlans.slice(0, 5).map((plan, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    plan.tier === "starter"
                                                        ? "bg-green-500"
                                                        : plan.tier === "bronze"
                                                            ? "bg-amber-600"
                                                            : plan.tier === "silver"
                                                                ? "bg-gray-400"
                                                                : plan.tier === "gold"
                                                                    ? "bg-yellow-500"
                                                                    : "bg-slate-300"
                                                }`}
                                            />
                                            <span className="text-sm font-semibold text-gray-700">{plan.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{plan.users} users</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${
                                                plan.tier === "starter"
                                                    ? "bg-green-500"
                                                    : plan.tier === "bronze"
                                                        ? "bg-amber-600"
                                                        : plan.tier === "silver"
                                                            ? "bg-gray-400"
                                                            : plan.tier === "gold"
                                                                ? "bg-yellow-500"
                                                                : "bg-slate-300"
                                            }`}
                                            style={{width: `${(plan.users / 145) * 100}%`}}
                                        />
                                    </div>
                                    <p className="text-xs font-bold text-gray-600">
                                        ${plan.revenue.toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tasks Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Tasks Overview</h2>
                        <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600"/>
                            <span className="font-bold text-gray-800">{stats.completedTasks} Completed</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TasksData.map((task, index) => (
                            <div key={index} className="border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg text-gray-800">{task.type}</h3>
                                    <Award className="w-6 h-6 text-purple-600"/>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Completed</span>
                                        <span className="font-bold text-green-600">{task.completed}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Pending</span>
                                        <span className="font-bold text-yellow-600">{task.pending}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t">
                                        <span className="text-sm font-semibold text-gray-700">Total</span>
                                        <span className="font-bold text-gray-800">{task.total}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                            View All →
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            activity.type === "deposit"
                                                ? "bg-green-100"
                                                : activity.type === "withdrawal"
                                                    ? "bg-orange-100"
                                                    : activity.type === "investment"
                                                        ? "bg-purple-100"
                                                        : "bg-blue-100"
                                        }`}
                                    >
                                        {activity.type === "deposit" && (
                                            <TrendingUp className="w-5 h-5 text-green-600"/>
                                        )}
                                        {activity.type === "withdrawal" && (
                                            <TrendingDown className="w-5 h-5 text-orange-600"/>
                                        )}
                                        {activity.type === "investment" && (
                                            <Briefcase className="w-5 h-5 text-purple-600"/>
                                        )}
                                        {activity.type === "task" && <Target className="w-5 h-5 text-blue-600"/>}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 capitalize">
                                            {activity.type} - {activity.user}
                                        </p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-800">${activity.amount}</p>
                                    <span
                                        className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                                            activity.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : activity.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                    {activity.status}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;