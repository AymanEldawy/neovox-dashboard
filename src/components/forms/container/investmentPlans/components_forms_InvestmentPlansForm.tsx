import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Save, } from "lucide-react";
import { createInvestmentPlan, getInvestmentPlanById, updateInvestmentPlan, } from '@/services/investmentPlansService.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { InvestmentPlan } from "@/types/types_investmentPlans";
import { aiIcons, tierOptions } from "@/pages/investment-plans/utils";
import { BasicInformation } from "@/pages/investment-plans/BasicInformation";
import { InvestmentDetails } from "@/pages/investment-plans/InvestmentDetails";
import { TaskRequirements } from "@/pages/investment-plans/TaskRequirements";
import { SettingsSidebar } from "@/pages/investment-plans/SettingsSidebar";
import { CreditLimits } from "@/pages/investment-plans/CreditLimits.tsx";


// Custom hook for form logic
const useInvestmentPlanForm = () => {
    const { id } = useParams<{ id?: string }>();
    const [formData, setFormData] = useState<InvestmentPlan>(new InvestmentPlan());
    const [errors, setErrors] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            getInvestmentPlanById(id!).then((res) => {
                const data = res.data;
                const parsedData = {
                    ...data,
                    requirements: data.requirements ? JSON.parse(data.requirements) : formData.requirements,
                };
                if (parsedData.requirements.isTeam !== undefined) {
                    parsedData.isTeam = parsedData.requirements.isTeam;
                    parsedData.teamMembersCount = parsedData.requirements.teamMembersCount;
                    delete parsedData.requirements.isTeam;
                    delete parsedData.requirements.teamMembersCount;
                }
                setFormData(new InvestmentPlan(parsedData));
            }).catch((err) => {
                setErrors({ fetch: err.message });
            });
        }
    }, [id, isEditMode]);

    const handleInputChange = <K extends keyof InvestmentPlan>(
        field: K,
        value: InvestmentPlan[K]
    ) => {
        // @ts-ignore
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            Object.setPrototypeOf(updated, InvestmentPlan.prototype);
            return updated;
        });
    };

    const handleRequirementChange = <K extends keyof InvestmentPlan['requirements']>(
        field: K,
        value: InvestmentPlan['requirements'][K]
    ) => {
        // @ts-ignore
        setFormData((prev) => {
            const updated = {
                ...prev,
                requirements: { ...prev.requirements, [field]: value },
            };
            Object.setPrototypeOf(updated, InvestmentPlan.prototype);
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dto = formData.toDto();

        const serviceCall = isEditMode ? updateInvestmentPlan(id, dto) : createInvestmentPlan(dto as any);
        serviceCall.then(() => {
            setShowDialog(true);
        }).catch((err) => {
            setErrors({ submit: err.message });
        });
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        setFormData(new InvestmentPlan());
        navigate('/investment-plans');
    };

    const handleCancel = () => {
        navigate('/investment-plans');
    };

    return {
        formData,
        errors,
        showDialog,
        isEditMode,
        handleInputChange,
        handleRequirementChange,
        handleSubmit,
        handleDialogClose,
        handleCancel,
    };
};

const ActionButtons = ({ handleSubmit, handleCancel, isEditMode }: {
    handleSubmit: (e: React.FormEvent) => void;
    handleCancel: () => void;
    isEditMode: boolean;
}) => (
    <div className="space-y-3">
        <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
            <Save className="w-5 h-5" />
            {isEditMode ? "Update Investment Plan" : "Save Investment Plan"}
        </button>
        <button
            onClick={handleCancel}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
        >
            Cancel
        </button>
    </div>
);
// Main Component
const InvestmentPlanForm = () => {
    const {
        formData,
        showDialog,
        isEditMode,
        handleInputChange,
        handleRequirementChange,
        handleSubmit,
        handleDialogClose,
        handleCancel,
    } = useInvestmentPlanForm();

    const selectedTier = tierOptions.find((t) => t.value === formData.tier);
    const selectedIcon = aiIcons.find((i) => i.name === formData.icon);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/20 rounded-lg transition" onClick={handleCancel}>
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">
                                    {isEditMode ? "Edit Investment Plan" : "Create Investment Plan"}
                                </h1>
                                <p className="text-indigo-100">Configure your investment plan details and
                                    requirements</p>
                            </div>
                        </div>
                        <div
                            className={`px-4 py-2 rounded-full font-semibold ${formData.isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
                        >
                            {formData.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>

                {/* Success Dialog */}
                {showDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <h3 className="text-lg font-semibold text-gray-800">Success</h3>
                            </div>
                            <p className="text-gray-600 mb-6">Investment
                                plan {isEditMode ? "updated" : "created"} successfully!</p>
                            <button
                                onClick={handleDialogClose}
                                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <BasicInformation
                            formData={formData}
                            handleInputChange={handleInputChange}
                            tierOptions={tierOptions}
                            selectedTier={selectedTier}
                            aiIcons={aiIcons}
                            selectedIcon={selectedIcon}
                        />
                        <InvestmentDetails
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleRequirementChange={handleRequirementChange}
                        />
                        <CreditLimits
                            formData={formData}
                            handleInputChange={handleInputChange}
                        />

                        <TaskRequirements
                            formData={formData}
                            handleRequirementChange={handleRequirementChange}
                        />
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <SettingsSidebar
                            formData={formData}
                            handleInputChange={handleInputChange}
                            selectedTier={selectedTier}
                        />
                        <ActionButtons
                            handleSubmit={handleSubmit}
                            handleCancel={handleCancel}
                            isEditMode={isEditMode}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPlanForm;