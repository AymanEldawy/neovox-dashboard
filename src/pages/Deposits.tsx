import { useState } from "react";
import {
    DollarSign,
    Eye,
    Check,
    X,
    Calendar,
    User,
    FileText,
    ImageIcon,
    TrendingUp,
    Hash,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Search,
    Filter,
    Download,
    RefreshCw,
} from "lucide-react";

const DepositsTable = () => {
    // Mock data from API
    const [deposits, setDeposits] = useState([
        {
            id: "a5d89beb-c293-4941-86fb-6a28d7db9d56",
            amount: 10,
            currency: "USDT",
            method: "crypto",
            status: "pending",
            createdAt: "2025-09-28T20:27:53.933Z",
            receiptFile: "/uploads/receipts/1759102073924-99231220.jpeg",
            user: {
                firstName: "Marwan",
                lastName: "Bakri",
                email: "marwanbakri3010@gmail.com",
            },
        },
        {
            id: "30ca5e01-370d-4276-a4dc-f3ab33ab639f",
            amount: 120,
            currency: "USDT",
            method: "crypto",
            status: "pending",
            createdAt: "2025-09-28T20:26:40.513Z",
            receiptFile: "/uploads/default/1759102000503-277433564.jpeg",
            user: {
                firstName: "Marwan",
                lastName: "Bakri",
                email: "marwanbakri3010@gmail.com",
            },
        },
        {
            id: "63e18688-7943-426f-9461-7547ef710722",
            amount: 150,
            currency: "USDT",
            method: "crypto",
            status: "pending",
            createdAt: "2025-09-28T20:23:05.241Z",
            receiptFile: "/uploads/receiptees/1759101785218-564366519.jpeg",
            user: {
                firstName: "Marwan",
                lastName: "Bakri",
                email: "marwanbakri3010@gmail.com",
            },
        },
    ]);

    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const handleViewDetails = (deposit) => {
        setSelectedDeposit(deposit);
        setShowModal(true);
    };

    const handleApprove = (depositId) => {
        setDeposits((prev) =>
            prev.map((d) => (d.id === depositId ? { ...d, status: "approved" } : d))
        );
        console.log("Approved:", depositId);
    };

    const handleReject = (depositId) => {
        setDeposits((prev) =>
            prev.map((d) => (d.id === depositId ? { ...d, status: "rejected" } : d))
        );
        console.log("Rejected:", depositId);
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
                bg: "bg-green-100",
                text: "text-green-700",
                border: "border-green-300",
                icon: CheckCircle,
                label: "Approved",
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

    const filteredDeposits = deposits.filter((deposit) => {
        const matchesSearch =
            deposit.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deposit.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deposit.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || deposit.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: deposits.length,
        pending: deposits.filter((d) => d.status === "pending").length,
        approved: deposits.filter((d) => d.status === "approved").length,
        rejected: deposits.filter((d) => d.status === "rejected").length,
        totalAmount: deposits.reduce((sum, d) => sum + d.amount, 0),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Deposits Management</h1>
                            <p className="text-blue-100">Review and manage user deposits</p>
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
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
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
                            <p className="text-gray-600 text-sm font-medium">Total Amount</p>
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-blue-600">${stats.totalAmount}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition appearance-none"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredDeposits.map((deposit, index) => {
                                const statusConfig = getStatusConfig(deposit.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <tr
                                        key={deposit.id}
                                        className="hover:bg-blue-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                                    {deposit.user.firstName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {deposit.user.firstName} {deposit.user.lastName}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{deposit.user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-5 h-5 text-green-600" />
                                                <span className="font-bold text-lg text-gray-800">
                            {deposit.amount}
                          </span>
                                                <span className="text-sm text-gray-500">{deposit.currency}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                        <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold capitalize">
                          {deposit.method}
                        </span>
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
                                                <span className="text-sm">{formatDate(deposit.createdAt)}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(deposit)}
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>

                                                {deposit.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(deposit.id)}
                                                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                                                            title="Approve"
                                                        >
                                                            <Check className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(deposit.id)}
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

                        {filteredDeposits.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No deposits found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedDeposit && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white sticky top-0 z-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Deposit Details</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Info */}
                                <div className="space-y-6">
                                    {/* Deposit ID */}
                                    <div className="bg-blue-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Hash className="w-5 h-5 text-blue-600" />
                                            <p className="text-sm font-semibold text-gray-600">Deposit ID</p>
                                        </div>
                                        <p className="text-sm text-gray-800 font-mono break-all">
                                            {selectedDeposit.id}
                                        </p>
                                    </div>

                                    {/* User Info */}
                                    <div className="border-2 border-gray-200 rounded-xl p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <User className="w-5 h-5 text-indigo-600" />
                                            <h3 className="font-bold text-lg">User Information</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500">Name</p>
                                                <p className="font-semibold text-gray-800">
                                                    {selectedDeposit.user.firstName} {selectedDeposit.user.lastName}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-semibold text-gray-800">
                                                    {selectedDeposit.user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Deposit Info */}
                                    <div className="border-2 border-gray-200 rounded-xl p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                            <h3 className="font-bold text-lg">Deposit Information</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500">Amount</p>
                                                <p className="font-bold text-2xl text-green-600">
                                                    ${selectedDeposit.amount} {selectedDeposit.currency}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500">Method</p>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-semibold capitalize">
                          {selectedDeposit.method}
                        </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500">Status</p>
                                                {(() => {
                                                    const statusConfig = getStatusConfig(selectedDeposit.status);
                                                    const StatusIcon = statusConfig.icon;
                                                    return (
                                                        <div
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusConfig.bg} ${statusConfig.text} font-semibold`}
                                                        >
                                                            <StatusIcon className="w-4 h-4" />
                                                            {statusConfig.label}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500">Date</p>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                            {formatDate(selectedDeposit.createdAt)}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Receipt Image */}
                                <div className="space-y-6">
                                    <div className="border-2 border-gray-200 rounded-xl p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <ImageIcon className="w-5 h-5 text-purple-600" />
                                            <h3 className="font-bold text-lg">Receipt Image</h3>
                                        </div>
                                        <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
                                            <img
                                                src={`https://via.placeholder.com/600x800?text=Receipt+Image`}
                                                alt="Receipt"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/600x800?text=Image+Not+Available";
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 break-all">
                                            {selectedDeposit.receiptFile}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {selectedDeposit.status === "pending" && (
                                <div className="mt-8 flex gap-4">
                                    <button
                                        onClick={() => {
                                            handleApprove(selectedDeposit.id);
                                            setShowModal(false);
                                        }}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-5 h-5" />
                                        Approve Deposit
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleReject(selectedDeposit.id);
                                            setShowModal(false);
                                        }}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <X className="w-5 h-5" />
                                        Reject Deposit
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

export default DepositsTable;