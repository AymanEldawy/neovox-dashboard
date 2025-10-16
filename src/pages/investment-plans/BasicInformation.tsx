import {InvestmentPlan} from "@/types/types_investmentPlans.ts";
import {useState} from "react";
import {Calendar, FileText, Layers, Sparkles, TrendingUp} from "lucide-react";

export const BasicInformation = ({ formData, handleInputChange, tierOptions, selectedTier, aiIcons, selectedIcon }: {
    formData: InvestmentPlan;
    handleInputChange: <K extends keyof InvestmentPlan>(field: K, value: InvestmentPlan[K]) => void;
    tierOptions: { value: string; label: string; color: string }[];
    selectedTier: { value: string; label: string; color: string } | undefined;
    aiIcons: { name: string; emoji: string }[];
    selectedIcon: { name: string; emoji: string } | undefined;
}) => {
    const [showIconDropdown, setShowIconDropdown] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-xl">
                    <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            Plan Icon
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowIconDropdown(!showIconDropdown)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition flex items-center justify-between bg-white hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{selectedIcon?.emoji || '🤖'}</span>
                                    <span className="text-gray-700">{selectedIcon?.name || 'Select an icon'}</span>
                                </div>
                                <Sparkles className="w-5 h-5 text-gray-400" />
                            </button>
                            {showIconDropdown && (
                                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
                                    <div className="grid grid-cols-3 gap-2 p-3">
                                        {aiIcons.map((icon) => (
                                            <button
                                                key={icon.name}
                                                type="button"
                                                onClick={() => {
                                                    handleInputChange("icon", icon.name);
                                                    setShowIconDropdown(false);
                                                }}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-indigo-50 transition ${
                                                    formData.icon === icon.name ? 'bg-indigo-100 ring-2 ring-indigo-500' : ''
                                                }`}
                                            >
                                                <span className="text-4xl">{icon.emoji}</span>
                                                <span className="text-xs text-gray-600 text-center">{icon.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
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
                                className="w-full px-8 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition appearance-none"
                            >
                                <option value="" disabled>Select a tier</option>
                                {tierOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div
                                className={`absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${selectedTier?.color || 'bg-gray-300'}`}
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
                            value={formData.duration || ""}
                            onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition"
                            placeholder="e.g., 3"
                        />
                    </div>
                </div>
                <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <FileText className="w-5 h-5 text-gray-600" />
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition resize-none"
                        placeholder="Describe the investment plan benefits and features..."
                    />
                </div>
            </div>
        </div>
    );
};