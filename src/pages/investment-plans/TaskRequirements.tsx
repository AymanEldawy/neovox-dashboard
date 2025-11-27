import { InvestmentPlan } from "@/types/types_investmentPlans.ts";
import { CheckCircle, Target, Calculator } from "lucide-react";
import { useMemo } from "react";

export const TaskRequirements = ({ formData, handleRequirementChange }: {
    formData: InvestmentPlan;
    handleRequirementChange: <K extends keyof InvestmentPlan['requirements']>(field: K, value: InvestmentPlan['requirements'][K]) => void;
}) => {
    // Calculate total tasks automatically
    const calculatedTotalTasks = useMemo(() => {
        return formData.duration * formData.requirements.tasksPerDay;
    }, [formData.duration, formData.requirements.tasksPerDay]);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                    <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Task Requirements</h2>
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
                            value={formData.requirements.tasksPerDay || ""}
                            onChange={(e) => handleRequirementChange("tasksPerDay", parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                            placeholder="e.g., 5"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Calculator className="w-5 h-5 text-indigo-600" />
                            Total Tasks
                            <span className="text-xs text-gray-500 font-normal">(Auto-calculated)</span>
                        </label>
                        <input
                            type="number"
                            value={calculatedTotalTasks}
                            readOnly
                            disabled
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                            placeholder="Calculated automatically"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            = Duration ({formData.duration} days) × Tasks Per Day ({formData.requirements.tasksPerDay})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};