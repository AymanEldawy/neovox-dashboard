import { useEffect, useRef, useState } from "react";
import {
    AlertCircle,
    Calendar,
    Check,
    CheckCircle,
    Clock,
    DollarSign,
    Eye,
    FileText,
    Filter,
    Hash,
    ImageIcon,
    Search,
    TrendingUp,
    User,
    X,
    XCircle,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { approveDeposit, getAllDeposits, rejectDeposit } from "@/services/depositsService.ts";
import type { DepositDto, } from "@/types/types_deposit.ts";
import type { FinancialsStatus, StatusConfig } from "@/types/StatusConfig.ts";

const DepositsTable = () => {
    const [deposits, setDeposits] = useState<DepositDto[]>([]);
    const [selectedDeposit, setSelectedDeposit] = useState<DepositDto>();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isZoomEnabled, setIsZoomEnabled] = useState(true);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        getAllDeposits().then((data) => {
            setDeposits(data.data);
        });
    }, []);

    const handleViewDetails = (deposit: DepositDto) => {
        setSelectedDeposit(deposit);
        setShowModal(true);
    };

    const handleApprove = async (depositId: string) => {
        try {
            await approveDeposit(depositId);
            // Reload all deposits to get fresh data
            const data = await getAllDeposits();
            setDeposits(data.data);
            // Update selected deposit if modal is still open
            const updatedDeposit = data.data.find((d: DepositDto) => d.id === depositId);
            if (updatedDeposit) {
                setSelectedDeposit(updatedDeposit);
            }
        } catch (error) {
            console.error('Error approving deposit:', error);
        }
    };

    const handleReject = async (depositId: string) => {
        try {
            await rejectDeposit(depositId);
            // Reload all deposits to get fresh data
            const data = await getAllDeposits();
            setDeposits(data.data);
            // Update selected deposit if modal is still open
            const updatedDeposit = data.data.find((d: DepositDto) => d.id === depositId);
            if (updatedDeposit) {
                setSelectedDeposit(updatedDeposit);
            }
        } catch (error) {
            console.error('Error rejecting deposit:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusConfig = (status: FinancialsStatus): StatusConfig => {
        const configs: Record<FinancialsStatus, StatusConfig> = {
            pending: {
                bg: "bg-yellow-100",
                text: "text-yellow-700",
                border: "border-yellow-300",
                icon: AlertCircle,
                label: "Pending",
            },
            confirmed: {
                bg: "bg-green-100",
                text: "text-green-700",
                border: "border-green-300",
                icon: CheckCircle,
                label: "Confirmed",
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

    const filteredDeposits = deposits.filter((deposit: DepositDto) => {
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
        confirmed: deposits.filter((d) => d.status === "confirmed").length,
        rejected: deposits.filter((d) => d.status === "rejected").length,
        totalAmount: deposits
            .filter((w) => w.status !== "rejected")
            .reduce((sum, d) => sum + d.amount, 0),
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!isZoomEnabled || !imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setZoomPosition({ x, y });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Deposits Management</h1>
                            <p className="text-blue-100">Review and manage user deposits</p>
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
                            <p className="text-gray-600 text-sm font-medium">Confirmed</p>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
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
                                <option value="confirmed">Confirmed</option>
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
                                {filteredDeposits.map((deposit) => {
                                    const statusConfig = getStatusConfig(deposit.status);
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <tr key={deposit.id} className="hover:bg-blue-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
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
                                                    <span
                                                        className="font-bold text-lg text-gray-800">{deposit.amount}</span>
                                                    <span className="text-sm text-gray-500">{deposit.currency}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold capitalize">
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
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto custom-scrollbar">
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

                        <div className="p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Left Column - Info */}
                                <div className="space-y-8">
                                    {/* Deposit ID */}
                                    <div className="bg-blue-50 rounded-xl p-5">
                                        <div className="flex items-center gap-2 mb-3">
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
                                                <span
                                                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-semibold capitalize">
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
                                                    <span
                                                        className="text-sm">{formatDate(selectedDeposit.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Receipt Image */}
                                <div className="space-y-6 flex flex-col">
                                    <div className="border-2 border-gray-200 rounded-xl p-6 flex-1 relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <ImageIcon className="w-5 h-5 text-purple-600" />
                                                <h3 className="font-bold text-lg">Receipt Image</h3>
                                            </div>
                                            {/*<button*/}
                                            {/*    onClick={() => setIsZoomEnabled(!isZoomEnabled)}*/}
                                            {/*    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition flex items-center gap-2"*/}
                                            {/*    title={isZoomEnabled ? "Disable Zoom" : "Enable Zoom"}*/}
                                            {/*>*/}
                                            {/*    {isZoomEnabled ? <ZoomOut className="w-5 h-5"/> :*/}
                                            {/*        <ZoomIn className="w-5 h-5"/>}*/}
                                            {/*    {isZoomEnabled ? "Disable Zoom" : "Enable Zoom"}*/}
                                            {/*</button>*/}
                                        </div>
                                        <div
                                            className="relative bg-gray-100 rounded-xl overflow-hidden flex-1 min-h-[600px]">
                                            <img
                                                ref={imageRef}
                                                src={import.meta.env.VITE_API_URL + selectedDeposit.receiptFile}
                                                alt="Receipt"
                                                className="w-full h-full object-contain"
                                                onMouseMove={handleMouseMove}
                                            />
                                            {isZoomEnabled && (
                                                <div
                                                    className="absolute w-32 h-32 rounded-full pointer-events-none"
                                                    style={{
                                                        transform: `translate(${zoomPosition.x - 64}px, ${zoomPosition.y - 64}px)`,
                                                        backgroundImage: `url(${import.meta.env.VITE_API_URL + selectedDeposit.receiptFile})`,
                                                        backgroundPosition: `-${zoomPosition.x * 2}px -${zoomPosition.y * 2}px`,
                                                        backgroundSize: `${imageRef.current ? imageRef.current.naturalWidth * 2 : 0}px ${imageRef.current ? imageRef.current.naturalHeight * 2 : 0}px`,
                                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                                    }}
                                                />
                                            )}
                                        </div>
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

