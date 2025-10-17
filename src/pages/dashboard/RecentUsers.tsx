import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {getRecentUsersAndFirstUserDeposit} from "@/services/dashboardService.ts";

interface User {
    id: string;
    display_name: string;
    email: string;
    created_at: string;
    total_deposit_amount: string;
    latest_deposit_status: string | null;
    latest_deposit_ago: string | null;
}

const RecentUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getRecentUsersAndFirstUserDeposit();
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch recent users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
                <button
                    onClick={() => navigate("/users")}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                    View All →
                </button>
            </div>
            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                {user.display_name[0]}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{user.display_name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-800">${parseFloat(user.total_deposit_amount).toFixed(2)}</p>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                                        user.latest_deposit_status === "confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {user.latest_deposit_status || "pending"}
                                </span>
                                <span className="text-xs text-gray-500">{user.latest_deposit_ago || ""}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentUsers;