import { AlertCircle, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStats } from "@/services/dashboardService";
import { getUnpaidReferralStats, payoutAllReferralCommissions } from "@/services/referralsService";
import Modal from "@/components/shared/Modal";

interface Stats {
    total_deposits_pending: number;
    total_withdrawals_pending: number;
}

interface ReferralStats {
    totalAmount: number;
    usersCount: number;
}

const PendingActions = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<Stats>({
        total_deposits_pending: 0,
        total_withdrawals_pending: 0,
    });
    const [referralStats, setReferralStats] = useState<ReferralStats>({ totalAmount: 0, usersCount: 0 });
    const [payoutLoading, setPayoutLoading] = useState(false);
    const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStats();
                setStats(response.data);

                // Fetch referral stats
                const refStats = await getUnpaidReferralStats();
                setReferralStats(refStats.data || refStats);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };
        fetchStats();
    }, []);

    const handlePayoutAll = async () => {
        setShowConfirmModal(false);
        try {
            setPayoutLoading(true);
            const res = await payoutAllReferralCommissions();
            const data = res.data || res;
            setPayoutSuccess(`Paid $${data.totalPaid} to ${data.processedUsers} users.`);
            setReferralStats({ totalAmount: 0, usersCount: 0 }); // Reset UI
            setTimeout(() => setPayoutSuccess(null), 5000);
        } catch (err) {
            console.error(err);
            alert('Failed to payout');
        } finally {
            setPayoutLoading(false);
        }
    };


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Referral Payout Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Unpaid Referrals</p>
                                <p className="text-2xl font-bold text-gray-800">${referralStats.totalAmount.toFixed(2)}</p>
                                <p className="text-xs text-gray-400">{referralStats.usersCount} Users Pending</p>
                            </div>
                        </div>
                    </div>
                    {payoutSuccess ? (
                        <div className="text-green-600 text-sm font-semibold animate-pulse">{payoutSuccess}</div>
                    ) : (
                        <button
                            onClick={() => setShowConfirmModal(true)}
                            disabled={payoutLoading || referralStats.totalAmount <= 0}
                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {payoutLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            ) : 'Pay All'}
                        </button>
                    )}
                </div>
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

            {/* Confirmation Modal */}
            <Modal open={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Payout</h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to payout <b>${referralStats.totalAmount.toFixed(2)}</b> to <b>{referralStats.usersCount}</b> users?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowConfirmModal(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePayoutAll}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                        >
                            Confirm Payment
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PendingActions;