import { useState } from "react";
import {
    TrendingUp,
    Calendar,
    DollarSign,
    FileText,
    CheckCircle,
    Users,
    Clock,
    Target,
    Zap,
    Layers,
    ArrowLeft,
    Save,
    AlertCircle,
} from "lucide-react";

// Mock form component (replace with your actual RHF components)
const InvestmentPlanForm = () => {
    const [formData, setFormData] = useState({
        name: "Starter Spark",
        tier: "starter",
        minInvestment: 10,
        maxInvestment: 10,
        dailyReturn: 4.5,
        duration: 3,
        description: "Basic starter plan for new investors",
        isActive: true,
        isTeam: false,
        teamMembersCount: null,
        requirements: {
            tasksPerDay: 5,
            totalTasks: 15,
            taskTime: "60–90s",
            dailyTime: "5–8 minutes",
            acceleratedReturn: "19.5%",
        },
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRequirementChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            requirements: { ...prev.requirements, [field]: value },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const tierOptions = [
        { value: "starter", label: "Starter", color: "bg-green-500" },
        { value: "bronze", label: "Bronze", color: "bg-amber-600" },
        { value: "silver", label: "Silver", color: "bg-gray-400" },
        { value: "gold", label: "Gold", color: "bg-yellow-500" },
        { value: "platinum", label: "Platinum", color: "bg-slate-300" },
        { value: "diamond", label: "Diamond", color: "bg-cyan-400" },
    ];

    const selectedTier = tierOptions.find((t) => t.value === formData.tier);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/20 rounded-lg transition">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">Investment Plan</h1>
                                <p className="text-indigo-100">
                                    Configure your investment plan details and requirements
                                </p>
                            </div>
                        </div>
                        <div
                            className={`px-4 py-2 rounded-full font-semibold ${
                                formData.isActive
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-300 text-gray-700"
                            }`}
                        >
                            {formData.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>

                {/* Success Alert */}
                {showSuccess && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-green-800 font-medium">
              Investment plan saved successfully!
            </span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-indigo-100 rounded-xl">
                                    <FileText className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Basic Information
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Plan Name */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                                        Plan Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition"
                                        placeholder="e.g., Starter Spark, Gold Rush"
                                    />
                                </div>

                                {/* Tier and Duration */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Layers className="w-5 h-5 text-purple-600" />
                                            Tier
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.tier}
                                                onChange={(e) => handleInputChange("tier", e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition appearance-none"
                                            >
                                                {tierOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div
                                                className={`absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${selectedTier?.color}`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                            Duration (Days)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.duration}
                                            onChange={(e) =>
                                                handleInputChange("duration", parseInt(e.target.value))
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <FileText className="w-5 h-5 text-gray-600" />
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            handleInputChange("description", e.target.value)
                                        }
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition resize-none"
                                        placeholder="Describe the investment plan benefits and features..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Investment Details Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Investment Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        Minimum Investment
                                    </label>
                                    <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      $
                    </span>
                                        <input
                                            type="number"
                                            value={formData.minInvestment}
                                            onChange={(e) =>
                                                handleInputChange("minInvestment", parseFloat(e.target.value))
                                            }
                                            className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <DollarSign className="w-5 h-5 text-red-600" />
                                        Maximum Investment
                                    </label>
                                    <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      $
                    </span>
                                        <input
                                            type="number"
                                            value={formData.maxInvestment}
                                            onChange={(e) =>
                                                handleInputChange("maxInvestment", parseFloat(e.target.value))
                                            }
                                            className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <TrendingUp className="w-5 h-5 text-orange-600" />
                                        Daily Return
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.dailyReturn}
                                            onChange={(e) =>
                                                handleInputChange("dailyReturn", parseFloat(e.target.value))
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      %
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Task Requirements Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Target className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Task Requirements
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                            Tasks Per Day
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.requirements.tasksPerDay}
                                            onChange={(e) =>
                                                handleRequirementChange("tasksPerDay", parseInt(e.target.value))
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Target className="w-5 h-5 text-indigo-600" />
                                            Total Tasks
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.requirements.totalTasks}
                                            onChange={(e) =>
                                                handleRequirementChange("totalTasks", parseInt(e.target.value))
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Clock className="w-5 h-5 text-cyan-600" />
                                            Task Time
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.requirements.taskTime}
                                            onChange={(e) =>
                                                handleRequirementChange("taskTime", e.target.value)
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                            placeholder="60–90s"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Clock className="w-5 h-5 text-purple-600" />
                                            Daily Time
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.requirements.dailyTime}
                                            onChange={(e) =>
                                                handleRequirementChange("dailyTime", e.target.value)
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                            placeholder="5–8 minutes"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Zap className="w-5 h-5 text-yellow-600" />
                                            Accelerated Return
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.requirements.acceleratedReturn}
                                            onChange={(e) =>
                                                handleRequirementChange("acceleratedReturn", e.target.value)
                                            }
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                            placeholder="19.5%"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Settings Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>

                            {/* Active Status */}
                            <div className="mb-6">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <p className="font-semibold text-gray-800">Plan Status</p>
                                        <p className="text-sm text-gray-500">
                                            {formData.isActive ? "Plan is active" : "Plan is inactive"}
                                        </p>
                                    </div>
                                    <div
                                        className={`relative w-14 h-8 rounded-full transition ${
                                            formData.isActive ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                        onClick={() => handleInputChange("isActive", !formData.isActive)}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${
                                                formData.isActive ? "translate-x-6" : ""
                                            }`}
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="border-t border-gray-200 my-6" />

                            {/* Team Plan */}
                            <div className="mb-6">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <p className="font-semibold text-gray-800">Team Plan</p>
                                        <p className="text-sm text-gray-500">Enable for team investments</p>
                                    </div>
                                    <div
                                        className={`relative w-14 h-8 rounded-full transition ${
                                            formData.isTeam ? "bg-indigo-500" : "bg-gray-300"
                                        }`}
                                        onClick={() => handleInputChange("isTeam", !formData.isTeam)}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${
                                                formData.isTeam ? "translate-x-6" : ""
                                            }`}
                                        />
                                    </div>
                                </label>
                            </div>

                            {/* Team Members Count */}
                            {formData.isTeam && (
                                <div className="mb-6 animate-fadeIn">
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <Users className="w-5 h-5 text-cyan-600" />
                                        Team Members Count
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.teamMembersCount || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "teamMembersCount",
                                                e.target.value ? parseInt(e.target.value) : null
                                            )
                                        }
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition"
                                        placeholder="e.g., 5"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Number of required team members
                                    </p>
                                </div>
                            )}

                            <div className="border-t border-gray-200 my-6" />

                            {/* Summary */}
                            <div>
                                <p className="text-sm font-semibold text-gray-600 mb-3">Summary</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Status:</span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                formData.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                      {formData.isActive ? "Active" : "Inactive"}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Type:</span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                formData.isTeam
                                                    ? "bg-indigo-100 text-indigo-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                      {formData.isTeam ? "Team Plan" : "Individual"}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Tier:</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${selectedTier?.color}`} />
                                            <span className="text-sm font-medium capitalize">
                        {formData.tier}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                Save Investment Plan
                            </button>

                            <button className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition">
                                Cancel
                            </button>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-blue-900 mb-1">
                                        Important Note
                                    </p>
                                    <p className="text-xs text-blue-700">
                                        Make sure all investment details are accurate before saving. Changes
                                        may affect existing investments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPlanForm;