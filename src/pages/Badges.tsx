import { useEffect, useState } from "react";
import {
    AlertCircle,
    ArrowLeft,
    Award,
    Crown,
    Edit,
    Filter,
    Gift,
    Heart,
    Medal,
    Plus,
    Save,
    Search,
    Sparkles,
    Star,
    Target,
    Trash2,
    TrendingUp,
    Trophy,
    X,
    Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createBadge, deleteBadge, getAllBadges, updateBadge } from "@/services/badgesService";
import type { CreateBadgeDto } from "@/types/types_badges";

// ErrorBoundary Component
const ErrorBoundary: React.FC<{ children: React.ReactNode; fallback: React.ReactNode }> = ({ children, fallback }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (error: ErrorEvent) => {
            console.error("ErrorBoundary caught:", error);
            setHasError(true);
        };
        window.addEventListener("error", errorHandler);
        return () => window.removeEventListener("error", errorHandler);
    }, []);

    if (hasError) return <>{fallback}</>;
    return <>{children}</>;
};

const BadgesManagement: React.FC = () => {
    const navigate = useNavigate();
    const [badges, setBadges] = useState<CreateBadgeDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingBadge, setEditingBadge] = useState<CreateBadgeDto | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "star",
        requiredPoints: 0,
    });
    const [formError, setFormError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRarity, setFilterRarity] = useState("all");
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [badgeToDelete, setBadgeToDelete] = useState<string | null>(null);

    const iconOptions = [
        { value: "star", icon: Star, label: "Star" },
        { value: "trophy", icon: Trophy, label: "Trophy" },
        { value: "medal", icon: Medal, label: "Medal" },
        { value: "crown", icon: Crown, label: "Crown" },
        { value: "zap", icon: Zap, label: "Lightning" },
        { value: "target", icon: Target, label: "Target" },
        { value: "trending-up", icon: TrendingUp, label: "Growth" },
        { value: "heart", icon: Heart, label: "Heart" },
        { value: "gift", icon: Gift, label: "Gift" },
        { value: "sparkles", icon: Sparkles, label: "Sparkles" },
    ];

    const rarityConfig = {
        common: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300", glow: "" },
        uncommon: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300", glow: "shadow-green-200" },
        rare: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300", glow: "shadow-blue-200" },
        epic: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", glow: "shadow-purple-200" },
        legendary: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300", glow: "shadow-yellow-200" },
    };

    const fetchBadges = async () => {
        setLoading(true);
        try {
            const data = await getAllBadges();
            setBadges(data.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch badges.");
            setLoading(false);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBadges();
    }, []);

    const getIcon = (iconName: string) => {
        const iconObj = iconOptions.find((i) => i.value === iconName);
        return iconObj ? iconObj.icon : Star;
    };

    const handleOpenModal = (badge: CreateBadgeDto | null = null) => {
        if (badge) {
            setEditingBadge(badge);
            setFormData({
                name: badge.name || "",
                description: badge.description || "",
                icon: badge.icon || "star",
                requiredPoints: badge.requiredPoints || 0,
            });
        } else {
            setEditingBadge(null);
            setFormData({
                name: "",
                description: "",
                icon: "star",
                requiredPoints: 0,
            });
        }
        setFormError(null);
        setShowModal(true);
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setFormError("Badge name is required.");
            return false;
        }
        if (!formData.description.trim()) {
            setFormError("Description is required.");
            return false;
        }
        if (formData.requiredPoints < 0) {
            setFormError("Required points cannot be negative.");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            const payload: Partial<CreateBadgeDto> = {
                name: formData.name,
                description: formData.description,
                icon: formData.icon,
                requiredPoints: formData.requiredPoints,
            };

            if (editingBadge && editingBadge.id) {
                await updateBadge(editingBadge.id, payload);
                setSuccessMessage("Badge updated successfully!");
            } else {
                await createBadge(payload as CreateBadgeDto);
                setSuccessMessage("Badge created successfully!");
            }
            await fetchBadges(); // Refresh all badges after create/update
            setShowSuccessDialog(true);
        } catch (err) {
            setError(`Failed to ${editingBadge ? "update" : "create"} badge.`);
            console.error(err);
        }
    };

    const handleCloseSuccessDialog = () => {
        setShowSuccessDialog(false);
        setShowModal(false);
        setSearchTerm(""); // Clear search field after successful create/update
    };

    const handleDelete = (id: string) => {
        setBadgeToDelete(id);
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (badgeToDelete) {
            try {
                await deleteBadge(badgeToDelete);
                await fetchBadges(); // Refresh all badges after delete
                setShowConfirmDialog(false);
                setBadgeToDelete(null);
            } catch (err) {
                setError("Failed to delete badge.");
                console.error(err);
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmDialog(false);
        setBadgeToDelete(null);
    };

    const filteredBadges = badges.filter((badge) => {
        const name = badge.name || "";
        const description = badge.description || "";
        const matchesSearch =
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRarity = filterRarity === "all" || badge.rarity === filterRarity;
        return matchesSearch && matchesRarity;
    });

    const handleBack = () => {
        navigate("/admin");
    };

    const errorFallback = (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
            <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <span className="text-red-800 font-medium">An unexpected error occurred. Please try refreshing the page.</span>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <span className="text-red-800 font-medium">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <ErrorBoundary fallback={errorFallback}>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <button className="p-2 hover:bg-white/20 rounded-lg transition" onClick={handleBack}>
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <Award className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold mb-2">Badges Management</h1>
                                        <p className="text-purple-100">Create and manage achievement badges</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition font-semibold shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                Create Badge
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-purple-100 text-sm mb-1">Total Badges</p>
                                <p className="text-3xl font-bold">{badges.length}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-purple-100 text-sm mb-1">Common</p>
                                <p className="text-3xl font-bold">{badges.filter((b) => b.rarity === "common").length}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-purple-100 text-sm mb-1">Rare</p>
                                <p className="text-3xl font-bold">{badges.filter((b) => b.rarity === "rare").length}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <p className="text-purple-100 text-sm mb-1">Legendary</p>
                                <p className="text-3xl font-bold">{badges.filter((b) => b.rarity === "legendary").length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search badges..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={filterRarity}
                                    onChange={(e) => setFilterRarity(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition appearance-none"
                                >
                                    <option value="all">All Rarities</option>
                                    <option value="common">Common</option>
                                    <option value="uncommon">Uncommon</option>
                                    <option value="rare">Rare</option>
                                    <option value="epic">Epic</option>
                                    <option value="legendary">Legendary</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Badges Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBadges.map((badge) => {
                            const Icon = getIcon(badge.icon);
                            const rarity = rarityConfig[badge.rarity as keyof typeof rarityConfig] || rarityConfig.common;

                            return (
                                <div
                                    key={badge.id}
                                    className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${rarity.border} ${rarity.glow} hover:shadow-2xl transition-all transform hover:-translate-y-1`}
                                >
                                    {/* Badge Header */}
                                    <div className={`${rarity.bg} p-6 flex flex-col items-center relative`}>
                                        <span
                                            className={`absolute top-2 right-2 px-3 py-1 ${rarity.bg} ${rarity.text} rounded-full text-xs font-bold uppercase border ${rarity.border}`}
                                        >
                                            {badge.rarity}
                                        </span>
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3">
                                            <Icon className={`w-10 h-10 ${rarity.text}`} />
                                        </div>
                                        <h3 className={`text-xl font-bold text-center ${rarity.text}`}>{badge.name}</h3>
                                    </div>

                                    {/* Badge Body */}
                                    <div className="p-6 space-y-3">
                                        <p className="text-sm text-gray-600 text-center min-h-10">{badge.description}</p>

                                        <div className="space-y-2 pt-3 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Points:</span>
                                                <span className="text-xs font-bold text-purple-600">{badge.requiredPoints}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-4">
                                            <button
                                                onClick={() => handleOpenModal(badge)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => badge.id && handleDelete(badge.id)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {filteredBadges.length === 0 && (
                        <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
                            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg font-medium">No badges found</p>
                            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}

                    {/* Form Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white sticky top-0">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold">{editingBadge ? "Edit Badge" : "Create New Badge"}</h2>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="p-2 hover:bg-white/20 rounded-lg transition"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6">
                                    {formError && (
                                        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                            <span className="text-red-800">{formError}</span>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Badge Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                                placeholder="e.g., First Steps"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Required Points</label>
                                            <input
                                                type="number"
                                                value={formData.requiredPoints}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, requiredPoints: parseInt(e.target.value) || 0 })
                                                }
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition resize-none"
                                            placeholder="Describe the badge achievement..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                                        <div className="grid grid-cols-5 gap-3">
                                            {iconOptions.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => setFormData({ ...formData, icon: option.value })}
                                                        className={`p-4 border-2 rounded-xl transition ${formData.icon === option.value
                                                                ? "border-purple-500 bg-purple-50"
                                                                : "border-gray-200 hover:border-purple-300"
                                                            }`}
                                                    >
                                                        <Icon className="w-6 h-6 mx-auto text-purple-600" />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSave}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        {editingBadge ? "Update Badge" : "Create Badge"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Dialog */}
                    {showSuccessDialog && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Award className="w-8 h-8 text-green-600" />
                                    <h2 className="text-xl font-bold text-gray-900">Success</h2>
                                </div>
                                <p className="text-gray-600 mb-6">{successMessage}</p>
                                <button
                                    onClick={handleCloseSuccessDialog}
                                    className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Confirmation Dialog */}
                    {showConfirmDialog && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                    <h2 className="text-xl font-bold text-gray-900">Confirm Deletion</h2>
                                </div>
                                <p className="text-gray-600 mb-6">Are you sure you want to delete this badge? This action cannot be undone.</p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={cancelDelete}
                                        className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default BadgesManagement;