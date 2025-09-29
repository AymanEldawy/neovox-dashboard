import { useState } from "react";
import {
    DollarSign,
    Eye,
    Check,
    X,
    Calendar,
    User,
    FileText,
    TrendingDown,
    Hash,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Search,
    Filter,
    Download,
    RefreshCw,
    Wallet,
    Send,
    Info,
    CreditCard,
} from "lucide-react";

const WithdrawalsTable = () => {
    const [withdrawals, setWithdrawals] = useState([
        {
            id: "40c61ca8-4615-4482-969b-2f40ba39b492",
            amount: "20.00",
            fee: "5.00",
            netAmount: "195.00",
            currency: "USDT",
            method: "crypto",
            destination: "0x9876543210abcdef",
            status: "completed",
            reviewedBy: "system",
            reviewedAt: "2025-09-24T22:44:47.840Z",
            reason: "Awaiting user verification",
            createdAt: "2025-09-24T19:43:33.794Z",
            user: {
                firstName: "Marwan",
                lastName: "Bakri",
                email: "marwanbakri3010@gmail.com",
            },
        },
        {
            id: "21c9c419-979f-450a-bc7d-2b37f143e605",
            amount: "200.00",
            fee: "5.00",
            netAmount: "195.00",
            currency: "USDT",
            method: "crypto",
            destination: "0x9876543210abcdef",
            status: "completed",
            reviewedBy: "system",
            reviewedAt: "2025-09-24T22:25:27.904Z",
            reason: "Awaiting user verification",
            createdAt: "2025-09-24T19:24:35.452Z",
            user: {
                firstName: "Marwan",
                lastName: "Bakri",
                email: "marwanbakri3010@gmail.com",
            },
        },
        {
            id: "58d344df-1e3e-4fb2-b2bc-f6cd1cb20de7",
            amount: "200.00",
            fee: "5.00",
            netAmount: "195.00",
            currency: "USD",
            method: "crypto",
            destination: "0x9876543210abcdef",
            status: "pending",
            reviewedBy: "admin",
            reviewedAt: "2025-09-17T12:15:00.000Z",
            reason: "Awaiting user verification",
            createdAt: "2025-09-20T09:54:25.192Z",
            user: {
                firstName: "Marwan",
                lastName: "Bakri",
                email: "marwanbakri3010@gmail.com",
            },
        },
    ]);

    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const handleViewDetails = (withdrawal) => {
        setSelectedWithdrawal(withdrawal);
        setShowModal(true);
    };

    const handleApprove = (withdrawalId) => {
        setWithdrawals((prev) =>
            prev.map((w) => (w.id === withdrawalId ? { ...w, status: "approved" } : w))
        );
        console.log("Approved:", withdrawalId);
    };

    const handleReject = (withdrawalId) => {
        setWithdrawals((prev) =>
            prev.map((w) => (w.id === withdrawalId ? { ...w, status: "rejected" } : w))
        );
        console.log("Rejected:", withdrawalId);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                bg: "bg-yellow-100",
                text: "text-yellow-700",
                border: "border-yellow-300",
                icon: AlertCircle,
                label: "Pending",
            },
            approved: {
                bg: "bg-blue-100",
                text: "text-blue-700",
                border: "border-blue-300",
                icon: Send,
                label: "Approved",
            },
            completed: {
                bg: "bg-green-100",
                text: "text-green-700",
                border: "border-green-300",
                icon: CheckCircle,
                label: "Completed",
            },
            rejected: {
                bg: "bg-red-100",
                text: "text-red-700",
                border: "border-red-300",
                icon: XCircle,
                label: "Rejected",
            },
        };
        return configs[status] || configs.pending;
    };

    const filteredWithdrawals = withdrawals.filter((withdrawal) => {
        const matchesSearch =
            withdrawal.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            withdrawal.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            withdrawal.destination.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || withdrawal.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: withdrawals.length,
        pending: withdrawals.filter((w) => w.status === "pending").length,
        approved: withdrawals.filter((w) => w.status === "approved").length,
        completed: withdrawals.filter((w) => w.status === "completed").length,
        rejected: withdrawals.filter((w) => w.status === "rejected").length,
        totalAmount: withdrawals.reduce((sum, w) => sum + parseFloat(w.amount), 0),
        totalFees: withdrawals.reduce((sum, w) => sum + parseFloat(w.fee), 0),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Withdrawals Management</h1>
                            <p className="text-orange-100">Review and process withdrawal requests</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition">
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Total</p>
                            <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Pending</p>
                            <Clock className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Approved</p>
                            <Send className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{stats.approved}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Completed</p>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Rejected</p>
                            <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Amount</p>
                            <TrendingDown className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-2xl font-bold text-orange-600">${stats.totalAmount.toFixed(2)}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 text-sm font-medium">Fees</p>
                            <DollarSign className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-2xl font-bold text-purple-600">${stats.totalFees.toFixed(2)}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, ID, or destination..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition appearance-none"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Fee</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Net Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Destination</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredWithdrawals.map((withdrawal) => {
                                const statusConfig = getStatusConfig(withdrawal.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <tr key={withdrawal.id} className="hover:bg-orange-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                                                    {withdrawal.user.firstName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {withdrawal.user.firstName} {withdrawal.user.lastName}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{withdrawal.user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-5 h-5 text-orange-600" />
                                                <span className="font-bold text-lg text-gray-800">
                            {withdrawal.amount}
                          </span>
                                                <span className="text-sm text-gray-500">{withdrawal.currency}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-gray-600 font-medium">${withdrawal.fee}</span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-green-600 font-bold">${withdrawal.netAmount}</span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Wallet className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-mono text-gray-600">
                            {withdrawal.destination.substring(0, 8)}...
                                                    {withdrawal.destination.substring(withdrawal.destination.length - 6)}
                          </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-semibold`}
                                            >
                                                <StatusIcon className="w-4 h-4" />
                                                {statusConfig.label}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{formatDate(withdrawal.createdAt)}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(withdrawal)}
                                                    className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>

                                                {withdrawal.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(withdrawal.id)}
                                                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                                                            title="Approve"
                                                        >
                                                            <Check className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(withdrawal.id)}
                                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                                            title="Reject"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        {filteredWithdrawals.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No withdrawals found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedWithdrawal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white sticky top-0 z-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Withdrawal Details</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Withdrawal ID */}
                            <div className="bg-orange-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Hash className="w-5 h-5 text-orange-600" />
                                    <p className="text-sm font-semibold text-gray-600">Withdrawal ID</p>
                                </div>
                                <p className="text-sm text-gray-800 font-mono break-all">
                                    {selectedWithdrawal.id}
                                </p>
                            </div>

                            {/* User Info */}
                            <div className="border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="w-5 h-5 text-orange-600" />
                                    <h3 className="font-bold text-lg">User Information</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-semibold text-gray-800">
                                            {selectedWithdrawal.user.firstName} {selectedWithdrawal.user.lastName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-semibold text-gray-800">
                                            {selectedWithdrawal.user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Details */}
                            <div className="border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard className="w-5 h-5 text-green-600" />
                                    <h3 className="font-bold text-lg">Financial Details</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Requested Amount</p>
                                        <p className="font-bold text-xl text-gray-800">
                                            ${selectedWithdrawal.amount} {selectedWithdrawal.currency}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Processing Fee</p>
                                        <p className="font-bold text-lg text-red-600">
                                            -${selectedWithdrawal.fee}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                                        <p className="text-sm font-semibold text-gray-700">Net Amount</p>
                                        <p className="font-bold text-2xl text-green-600">
                                            ${selectedWithdrawal.netAmount}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Withdrawal Info */}
                            <div className="border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Wallet className="w-5 h-5 text-purple-600" />
                                    <h3 className="font-bold text-lg">Withdrawal Information</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Method</p>
                                        <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-semibold capitalize">
                      {selectedWithdrawal.method}
                    </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Destination Address</p>
                                        <p className="font-mono text-sm bg-gray-100 p-3 rounded-lg break-all">
                                            {selectedWithdrawal.destination}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Status</p>
                                        {(() => {
                                            const statusConfig = getStatusConfig(selectedWithdrawal.status);
                                            const StatusIcon = statusConfig.icon;
                                            return (
                                                <div
                                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.text} font-semibold`}
                                                >
                                                    <StatusIcon className="w-4 h-4" />
                                                    {statusConfig.label}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Created At</p>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm font-medium">
                          {formatDate(selectedWithdrawal.createdAt)}
                        </span>
                                            </div>
                                        </div>
                                        {selectedWithdrawal.reviewedAt && (
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Reviewed At</p>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                            {formatDate(selectedWithdrawal.reviewedAt)}
                          </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {selectedWithdrawal.reviewedBy && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Reviewed By</p>
                                            <p className="font-semibold text-gray-800 capitalize">
                                                {selectedWithdrawal.reviewedBy}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Reason */}
                            {selectedWithdrawal.reason && (
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-blue-900 mb-1">Reason</p>
                                            <p className="text-sm text-blue-700">{selectedWithdrawal.reason}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            {selectedWithdrawal.status === "pending" && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            handleApprove(selectedWithdrawal.id);
                                            setShowModal(false);
                                        }}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-5 h-5" />
                                        Approve Withdrawal
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleReject(selectedWithdrawal.id);
                                            setShowModal(false);
                                        }}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <X className="w-5 h-5" />
                                        Reject Withdrawal
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WithdrawalsTable;