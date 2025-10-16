import {InvestmentPlan} from "@/types/types_investmentPlans.ts";
import {Calendar, Clock, CreditCard, DollarSign, TrendingUp, Users, Zap} from "lucide-react";

export const InvestmentDetails = ({ formData, handleInputChange, handleRequirementChange }: {
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
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <Zap className="w-5 h-5 text-yellow-600" />
                        Accelerated Return
                    </label>
                    <input
                        type="text"
                        value={formData.requirements.acceleratedReturn}
                        onChange={(e) => handleRequirementChange("acceleratedReturn", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        placeholder="e.g., 19.5%"
                    />
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    Credit Limits & Subscriptions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            Monthly Limit CR
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.01"
                                value={formData.monthlyLimitCR || ""}
                                onChange={(e) => handleInputChange("monthlyLimitCR", parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                                placeholder="e.g., 1000.00"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Clock className="w-5 h-5 text-purple-600" />
                            Daily Limit CR
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.01"
                                value={formData.dailyLimitCR || ""}
                                onChange={(e) => handleInputChange("dailyLimitCR", parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                placeholder="e.g., 50.00"
                            />
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
        </div>
    </div>
);
