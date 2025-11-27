import { InvestmentPlan } from "@/types/types_investmentPlans.ts";
import { DollarSign, TrendingUp, Users } from "lucide-react";

export const InvestmentDetails = ({ formData, handleInputChange }: {
    formData: InvestmentPlan;
    handleInputChange: <K extends keyof InvestmentPlan>(field: K, value: InvestmentPlan[K]) => void;
    handleRequirementChange: <K extends keyof InvestmentPlan['requirements']>(field: K, value: InvestmentPlan['requirements'][K]) => void;
}) => (
    <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Investment Details</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Price Investment
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                    <input
                        type="number"
                        value={formData.minInvestment || ""}
                        onChange={(e) => handleInputChange("minInvestment", parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                        placeholder="e.g., 10"
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
                        value={formData.dailyReturn || ""}
                        onChange={(e) => handleInputChange("dailyReturn", parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                        placeholder="e.g., 4.5"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                </div>
            </div>
            <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    Subscription Limit
                </label>
                <div className="relative">
                    <input
                        type="number"
                        value={formData.subscriptionLimit || ""}
                        onChange={(e) => handleInputChange("subscriptionLimit", parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                        placeholder="e.g., 1"
                    />
                </div>
            </div>
        </div>

    </div>
);
