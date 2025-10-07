import {useState} from "react";
import {
    AlertCircle,
    ArrowLeft,
    Award,
    BookOpen,
    Calendar,
    CheckCircle,
    ClipboardList,
    FileText,
    Plus,
    Save,
    Settings,
    Target,
    Trash2,
    Zap
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import type {Task} from "@/types/type_task";
import {createMission} from "@/services/missionsService";
const TaskManagementForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Task>({
        title: "",
        description: "",
        type: "article",
        requirements: {
            content: "",
            questions: [{q: "", options: ["", "", "", ""]}],
        },
        rewards: {
            points: 20,
        },
        isActive: true,
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCancel = () => {
        navigate('/missions');
    };

    const handleInputChange = (field: keyof Task, value: any) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleRewardChange = (field: keyof Task["rewards"], value: any) => {
        setFormData((prev) => ({
            ...prev,
            rewards: {...prev.rewards, [field]: value},
        }));
    };

    const handleRequirementChange = (field: keyof Task["requirements"], value: any) => {
        setFormData((prev) => ({
            ...prev,
            requirements: {...prev.requirements, [field]: value},
        }));
    };

    const addQuestion = () => {
        setFormData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                questions: [
                    ...(prev.requirements.questions || []),
                    {q: "", options: ["", "", "", ""]},
                ],
            },
        }));
    };

    const removeQuestion = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                questions: (prev.requirements.questions || []).filter((_, i) => i !== index),
            },
        }));
    };

    const updateQuestion = (qIndex: number, field: "q" | "options", value: any) => {
        setFormData((prev) => {
            const newQuestions = [...(prev.requirements.questions || [])];
            newQuestions[qIndex] = {...newQuestions[qIndex], [field]: value};
            return {
                ...prev,
                requirements: {...prev.requirements, questions: newQuestions},
            };
        });
    };

    const updateOption = (qIndex: number, optIndex: number, value: string) => {
        setFormData((prev) => {
            const newQuestions = [...(prev.requirements.questions || [])];
            newQuestions[qIndex].options = [...newQuestions[qIndex].options];
            newQuestions[qIndex].options[optIndex] = value;
            return {
                ...prev,
                requirements: {...prev.requirements, questions: newQuestions},
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Clean up requirements based on task type
        const cleanedFormData :Task= {
            ...formData,
            requirements: {
                content: formData.type === "article" ? formData.requirements.content : undefined,
                questions: formData.type === "survey" ? formData.requirements.questions : undefined,
            },
        };
        console.log(JSON.stringify(cleanedFormData, null, 2));
        await createMission(cleanedFormData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const taskTypes = [
        {
            value: "article",
            label: "Article",
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-100",
            textColor: "text-blue-700"
        },
        {
            value: "survey",
            label: "Survey",
            icon: ClipboardList,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-100",
            textColor: "text-purple-700"
        },
        {
            value: "checkin",
            label: "Check-in",
            icon: Calendar,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-100",
            textColor: "text-green-700"
        },
    ] as const;

    const selectedType = taskTypes.find((t) => t.value === formData.type);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/20 rounded-lg transition" onClick={handleCancel}>
                                <ArrowLeft className="w-6 h-6"/>
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">Create New Task</h1>
                                <p className="text-purple-100">Design engaging tasks for your users with rewards and
                                    requirements</p>
                            </div>
                        </div>
                        <div
                            className={`px-4 py-2 rounded-full font-semibold ${formData.isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                            {formData.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>

                {/* Success Alert */}
                {showSuccess && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600"/>
                        <span className="text-green-800 font-medium">Task created successfully! 🎉</span>
                    </div>
                )}

                {/* Task Type Selection */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Target className="text-purple-600"/> Select Task Type
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {taskTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = formData.type === type.value;
                            return (
                                <button
                                    key={type.value}
                                    onClick={() => handleInputChange("type", type.value)}
                                    className={`relative p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${isSelected ? "border-purple-500 shadow-lg" : "border-gray-200 hover:border-purple-300"}`}
                                >
                                    <div
                                        className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? "bg-purple-500" : "bg-gray-200"}`}>
                                        {isSelected && <CheckCircle className="w-4 h-4 text-white"/>}
                                    </div>
                                    <div
                                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 mx-auto`}>
                                        <Icon className="w-8 h-8 text-white"/>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800">{type.label}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {type.value === "article" && "Read and learn from content"}
                                        {type.value === "survey" && "Answer questions and surveys"}
                                        {type.value === "checkin" && "Daily routine check-in"}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <FileText className="w-6 h-6 text-purple-600"/>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                            </div>
                            <div className="space-y-6">
                                {/* Title */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Zap className="w-5 h-5 text-purple-600"/> Task Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange("title", e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                                            placeholder="e.g., Read AI Article, Investment Survey"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <Award className="w-5 h-5 text-yellow-600"/> Points Reward
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.rewards.points}
                                            onChange={(e) => handleRewardChange("points", parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition"
                                        />
                                    </div>
                                </div>
                                {/* Description */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <FileText className="w-5 h-5 text-gray-600"/> Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition resize-none"
                                        placeholder="Describe the task and what users need to do..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Task Requirements - Dynamic based on type */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Settings className="w-6 h-6 text-blue-600"/>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Task Requirements</h2>
                            </div>

                            {/* Article Type */}
                            {formData.type === "article" && (
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                        <BookOpen className="w-5 h-5 text-blue-600"/> Article Content
                                    </label>
                                    <textarea
                                        value={formData.requirements.content || ""}
                                        onChange={(e) => handleRequirementChange("content", e.target.value)}
                                        rows={8}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none font-mono text-sm"
                                        placeholder="Paste or write the article content here..."
                                    />
                                    <p className="text-xs text-gray-500 mt-2">💡 Users will need to read this content to
                                        complete the task</p>
                                </div>
                            )}

                            {/* Survey Type */}
                            {formData.type === "survey" && (
                                <div className="space-y-6">
                                    <div className=" flex items-center justify-between">
                                        <p className="text-sm text-gray-600">Add questions for your survey</p>
                                        <button
                                            onClick={addQuestion}
                                            type="button"
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-semibold"
                                        >
                                            <Plus className="w-4 h-4"/> Add Question
                                        </button>
                                    </div>
                                    {(formData.requirements.questions || []).map((question, qIndex) => (
                                        <div key={qIndex}
                                             className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-bold text-purple-800">Question {qIndex + 1}</h3>
                                                {(formData.requirements.questions || []).length > 1 && (
                                                    <button
                                                        onClick={() => removeQuestion(qIndex)}
                                                        type="button"
                                                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                                                    >
                                                        <Trash2 className="w-4 h-4"/>
                                                    </button>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={question.q}
                                                onChange={(e) => updateQuestion(qIndex, "q", e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition mb-4"
                                                placeholder="Enter your question..."
                                            />
                                            <div className="space-y-2">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Options:</p>
                                                {question.options.map((option, optIndex) => (
                                                    <div key={optIndex} className="flex items-center gap-2">
                                                        <span
                                                            className="w-8 h-8 flex items-center justify-center bg-purple-200 text-purple-700 rounded-lg font-bold text-sm flex-shrink-0">{optIndex + 1}</span>
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                                                            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                                                            placeholder={`Option ${optIndex + 1}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Check-in Type */}
                            {formData.type === "checkin" && (
                                <div className="text-center py-12">
                                    <div
                                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-12 h-12 text-green-600"/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Check-in Task</h3>
                                    <p className="text-gray-600">No additional requirements needed. Users just need to
                                        check in daily!</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Settings Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Task Settings</h2>
                            {/* Active Status */}
                            <div className="mb-6">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <p className="font-semibold text-gray-800">Task Status</p>
                                        <p className="text-sm text-gray-500">{formData.isActive ? "Task is active" : "Task is inactive"}</p>
                                    </div>
                                    <div
                                        className={`relative w-14 h-8 rounded-full transition ${formData.isActive ? "bg-green-500" : "bg-gray-300"}`}
                                        onClick={() => handleInputChange("isActive", !formData.isActive)}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition transform ${formData.isActive ? "translate-x-6" : ""}`}/>
                                    </div>
                                </label>
                            </div>
                            <div className="border-t border-gray-200 my-6"/>
                            {/* Summary */}
                            <div>
                                <p className="text-sm font-semibold text-gray-600 mb-4">Summary</p>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Type:</span>
                                        <div
                                            className={`px-3 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-2 ${selectedType?.bgColor} ${selectedType?.textColor}`}>
                                            {selectedType && <selectedType.icon className="w-4 h-4"/>}
                                            {selectedType?.label}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Reward:</span>
                                        <div
                                            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-sm">
                                            <Award className="w-4 h-4"/>
                                            {formData.rewards.points} pts
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Status:</span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                            {formData.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5"/> Create Task
                            </button>
                            <button
                                type="button"
                                className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Info Box */}
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"/>
                                <div>
                                    <p className="text-sm font-semibold text-purple-900 mb-1">Pro Tip 💡</p>
                                    <p className="text-xs text-purple-700">
                                        {formData.type === "article" && "Make sure the article is engaging and provides value to readers."}
                                        {formData.type === "survey" && "Keep questions clear and provide meaningful options."}
                                        {formData.type === "checkin" && "Daily check-ins help build user engagement and habits."}
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

export default TaskManagementForm;