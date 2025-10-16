import {InvestmentPlan} from "@/types/types_investmentPlans.ts";
import {Users} from "lucide-react";

export const SettingsSidebar = ({ formData, handleInputChange, selectedTier }: {
    formData: InvestmentPlan;
    handleInputChange: <K extends keyof InvestmentPlan>(field: K, value: InvestmentPlan[K]) => void;
    selectedTier: { value: string; label: string; color: string } | undefined;
}) => (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
        <div className="mb-6">
            <label className="flex items-center justify-between cursor-pointer group">
                <div>
                    <p className="font-semibold text-gray-800">Plan Status</p>
                    <p className="text-sm text-gray-500">
                        {formData.isActive ? "Plan is active" : "Plan is inactive"}
                    </p>
                </div>
                <div
                    className={`relative w-14 h-8 rounded-full transition ${formData.isActive ? "bg-green-500" : "bg-gray-300"}`}
                    onClick={() => handleInputChange("isActive", !formData.isActive)}
                >
                    <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${formData.isActive ? "translate-x-6" : ""}`}
                    />
                </div>
            </label>
        </div>
        <div className="border-t border-gray-200 my-6" />
        <div className="mb-6">
            <label className="flex items-center justify-between cursor-pointer group">
                <div>
                    <p className="font-semibold text-gray-800">Team Plan</p>
                    <p className="text-sm text-gray-500">Enable for team investments</p>
                </div>
                <div
                    className={`relative w-14 h-8 rounded-full transition ${formData.isTeam ? "bg-indigo-500" : "bg-gray-300"}`}
                    onClick={() => handleInputChange("isTeam", !formData.isTeam)}
                >
                    <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${formData.isTeam ? "translate-x-6" : ""}`}
                    />
                </div>
            </label>
        </div>
        {formData.isTeam && (
            <div className="mb-6 animate-fadeIn">
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Users className="w-5 h-5 text-cyan-600" />
                    Team Members Count
                </label>
                <input
                    type="number"
                    value={formData.teamMembersCount || ""}
                    onChange={(e) => handleInputChange("teamMembersCount", e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition"
                    placeholder="e.g., 5"
                />
                <p className="text-xs text-gray-500 mt-1">Number of required team members</p>
            </div>
        )}
        <div className="border-t border-gray-200 my-6" />
        <div>
            <p className="text-sm font-semibold text-gray-600 mb-3">Summary</p>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                    >
                        {formData.isActive ? "Active" : "Inactive"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.isTeam ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"}`}
                    >
                        {formData.isTeam ? "Team Plan" : "Individual"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tier:</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${selectedTier?.color || 'bg-gray-300'}`} />
                        <span className="text-sm font-medium capitalize">{formData.tier || "None"}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);