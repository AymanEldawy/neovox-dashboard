// import { useState, useEffect } from "react";
// import { InvestmentPlan } from "@/types/types_investmentPlans.ts";
// import { Calendar, Clock, CreditCard, DollarSign, Zap, CheckCircle, TrendingUp, Plus, Minus } from "lucide-react";
//
// export const CreditLimits = ({
//                                  formData,
//                                  handleInputChange,
//                              }: {
//     formData: InvestmentPlan;
//     handleInputChange: <K extends keyof InvestmentPlan>(
//         field: K,
//         value: InvestmentPlan[K]
//     ) => void;
// }) => {
//     // تحديد الـ action النشط من البيانات
//     const determineActiveAction = (): "skip" | "boost" | null => {
//         if (formData.actions?.skip) return "skip";
//         if (formData.actions?.boost) return "boost";
//         return null;
//     };
//
//     const [activeAction, setActiveAction] = useState<"skip" | "boost" | null>(
//         determineActiveAction()
//     );
//
//     // استخراج القيم الحالية
//     const parseBoostValue = (value: string | null | undefined, type: 'roi' | 'time') => {
//         if (!value) return { number: 0, unit: type === 'roi' ? '%' : 'days' };
//         if (type === 'roi') {
//             const match = value.match(/([+-]?\d+\.?\d*)\s*%?/);
//             return { number: match ? parseFloat(match[1]) : 0, unit: '%' };
//         } else {
//             const match = value.match(/([+-]?\d+)\s*(day|days|hour|hours)/i);
//             return {
//                 number: match ? Math.abs(parseInt(match[1])) : 0,
//                 unit: match?.[2]?.toLowerCase().includes('hour') ? 'hours' : 'days'
//             };
//         }
//     };
//
//     const [roiValue, setRoiValue] = useState(() => {
//         const parsed = parseBoostValue(formData.actions?.boost?.roiBoost, 'roi');
//         return parsed.number;
//     });
//
//     const [timeValue, setTimeValue] = useState(() => {
//         const parsed = parseBoostValue(formData.actions?.boost?.timeReduction, 'time');
//         return parsed.number;
//     });
//
//     const [timeUnit, setTimeUnit] = useState<'days' | 'hours'>(() => {
//         const parsed = parseBoostValue(formData.actions?.boost?.timeReduction, 'time');
//         return parsed.unit as 'days' | 'hours';
//     });
//
//     const [boostType, setBoostType] = useState<"roi" | "time">(() => {
//         if (formData.actions?.boost?.roiBoost) return "roi";
//         if (formData.actions?.boost?.timeReduction) return "time";
//         return "roi";
//     });
//
//     // Effect لتحديث الـ state عند تحميل البيانات من الـ API
//     useEffect(() => {
//         const newActiveAction = determineActiveAction();
//         setActiveAction(newActiveAction);
//
//         if (formData.actions?.boost) {
//             const newBoostType = formData.actions.boost.roiBoost ? "roi" : "time";
//             setBoostType(newBoostType);
//
//             // تحديث قيم ROI
//             if (formData.actions.boost.roiBoost) {
//                 const parsed = parseBoostValue(formData.actions.boost.roiBoost, 'roi');
//                 setRoiValue(parsed.number);
//             }
//
//             // تحديث قيم Time
//             if (formData.actions.boost.timeReduction) {
//                 const parsed = parseBoostValue(formData.actions.boost.timeReduction, 'time');
//                 setTimeValue(parsed.number);
//                 setTimeUnit(parsed.unit as 'days' | 'hours');
//             }
//         }
//     }, [formData.actions]);
//
//     const handleActionToggle = (actionType: "skip" | "boost") => {
//         if (activeAction === actionType) {
//             setActiveAction(null);
//             handleInputChange("actions", undefined);
//         } else {
//             setActiveAction(actionType);
//             if (actionType === "skip") {
//                 handleInputChange("actions", {
//                     skip: {
//                         cost: 2,
//                         effect: "Skip one daily task without penalty",
//                         timeReduction: null,
//                     },
//                 });
//             } else {
//                 handleInputChange("actions", {
//                     boost: {
//                         cost: 3,
//                         effect: "Increase ROI temporarily",
//                         roiBoost: "+1%",
//                         timeReduction: null,
//                     },
//                 });
//                 setRoiValue(1);
//             }
//         }
//     };
//
//     const handleActionFieldChange = (
//         actionType: "skip" | "boost",
//         field: string,
//         value: string
//     ) => {
//         if (!formData.actions) return;
//
//         const updatedActions = { ...formData.actions };
//         if (actionType === "skip" && updatedActions.skip) {
//             updatedActions.skip = { ...updatedActions.skip, [field]: value };
//         } else if (actionType === "boost" && updatedActions.boost) {
//             updatedActions.boost = { ...updatedActions.boost, [field]: value };
//         }
//         handleInputChange("actions", updatedActions);
//     };
//
//     const handleBoostTypeChange = (type: "roi" | "time") => {
//         setBoostType(type);
//         if (!formData.actions?.boost) return;
//
//         const updatedActions = {
//             boost: {
//                 ...formData.actions.boost,
//                 roiBoost: type === "roi" ? `+${roiValue}%` : null,
//                 timeReduction: type === "time" ? `-${timeValue} ${timeUnit}` : null,
//             },
//         };
//         handleInputChange("actions", updatedActions);
//     };
//
//     const handleRoiChange = (value: number) => {
//         const roundedValue = Math.max(0, Math.round(value * 10) / 10);
//         setRoiValue(roundedValue);
//         if (!formData.actions?.boost) return;
//
//         const updatedActions = {
//             boost: {
//                 ...formData.actions.boost,
//                 roiBoost: `+${roundedValue}%`,
//             },
//         };
//         handleInputChange("actions", updatedActions);
//     };
//
//     const handleTimeChange = (value: number) => {
//         const intValue = Math.max(1, Math.round(value));
//         setTimeValue(intValue);
//         if (!formData.actions?.boost) return;
//
//         const updatedActions = {
//             boost: {
//                 ...formData.actions.boost,
//                 timeReduction: `-${intValue} ${timeUnit}`,
//             },
//         };
//         handleInputChange("actions", updatedActions);
//     };
//
//     const handleTimeUnitChange = (unit: 'days' | 'hours') => {
//         setTimeUnit(unit);
//         if (!formData.actions?.boost) return;
//
//         const updatedActions = {
//             boost: {
//                 ...formData.actions.boost,
//                 timeReduction: `-${timeValue} ${unit}`,
//             },
//         };
//         handleInputChange("actions", updatedActions);
//     };
//
//     return (
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//             {/* Credit Limits Section */}
//             <div className="border-b border-gray-200 pb-6 mb-6">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <CreditCard className="w-5 h-5 text-indigo-600" />
//                     Credit Limits
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                         <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                             <Calendar className="w-5 h-5 text-blue-600" />
//                             Monthly Limit CR
//                         </label>
//                         <input
//                             type="number"
//                             step="0.01"
//                             value={formData.monthlyLimitCR || ""}
//                             onChange={(e) =>
//                                 handleInputChange(
//                                     "monthlyLimitCR",
//                                     parseFloat(e.target.value) || 0
//                                 )
//                             }
//                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
//                             placeholder="e.g., 15"
//                         />
//                     </div>
//                     <div>
//                         <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                             <Clock className="w-5 h-5 text-purple-600" />
//                             Daily Limit CR
//                         </label>
//                         <input
//                             type="number"
//                             step="0.01"
//                             value={formData.dailyLimitCR || ""}
//                             onChange={(e) =>
//                                 handleInputChange(
//                                     "dailyLimitCR",
//                                     parseFloat(e.target.value) || 0
//                                 )
//                             }
//                             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
//                             placeholder="e.g., 2"
//                         />
//                     </div>
//                     <div>
//                         <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                             <DollarSign className="w-5 h-5 text-green-600" />
//                             Credit Price (CR)
//                         </label>
//                         <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
//                 $
//               </span>
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 value={formData.creditPrice || ""}
//                                 onChange={(e) =>
//                                     handleInputChange(
//                                         "creditPrice",
//                                         parseFloat(e.target.value) || 0
//                                     )
//                                 }
//                                 className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
//                                 placeholder="e.g., 0.5"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Actions Section */}
//             <div>
//                 <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                         <Zap className="w-5 h-5 text-purple-600" />
//                         Actions (اختر واحدة فقط)
//                     </h3>
//                     <div className="flex items-center gap-2">
//                         {activeAction && (
//                             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                 Current: {activeAction === "skip" ? "Skip" : activeAction === "boost" && boostType === "roi" ? "ROI Boost" : "Time Reduction"}
//               </span>
//                         )}
//                         <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
//                             activeAction === "skip"
//                                 ? "bg-orange-100 text-orange-700"
//                                 : activeAction === "boost"
//                                     ? "bg-green-100 text-green-700"
//                                     : "bg-gray-100 text-gray-500"
//                         }`}>
//               {activeAction === "skip"
//                   ? "Skip Active"
//                   : activeAction === "boost"
//                       ? "Boost Active"
//                       : "No Action"}
//             </span>
//                     </div>
//                 </div>
//
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Skip Action Card */}
//                     <div
//                         className={`border-2 rounded-xl p-5 transition cursor-pointer relative ${
//                             activeAction === "skip"
//                                 ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
//                                 : "border-gray-200 hover:border-orange-300"
//                         }`}
//                         onClick={() => handleActionToggle("skip")}
//                     >
//                         {activeAction === "skip" && (
//                             <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
//                                 ACTIVE
//                             </div>
//                         )}
//                         <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center gap-2">
//                                 <div className="p-2 bg-orange-100 rounded-lg">
//                                     <CheckCircle className="w-5 h-5 text-orange-600" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-gray-800 text-sm">Skip Action</h4>
//                                     <p className="text-xs text-gray-500">تخطي مهمة يومية</p>
//                                 </div>
//                             </div>
//                             <div
//                                 className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
//                                     activeAction === "skip"
//                                         ? "border-orange-500 bg-orange-500"
//                                         : "border-gray-300"
//                                 }`}
//                             >
//                                 {activeAction === "skip" && (
//                                     <div className="w-2.5 h-2.5 bg-white rounded-full" />
//                                 )}
//                             </div>
//                         </div>
//
//                         {activeAction === "skip" && (
//                             <div className="space-y-3 mt-3" onClick={(e) => e.stopPropagation()}>
//                                 <div>
//                                     <label className="text-xs font-semibold text-gray-700 mb-1 block">
//                                         Cost (Credits)
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={formData.actions?.skip?.cost || ""}
//                                         onChange={(e) =>
//                                             handleActionFieldChange(
//                                                 "skip",
//                                                 "cost",
//                                                 parseInt(e.target.value) || 0
//                                             )
//                                         }
//                                         className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition"
//                                         placeholder="e.g., 2"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-semibold text-gray-700 mb-1 block">
//                                         Effect Description
//                                     </label>
//                                     <textarea
//                                         value={formData.actions?.skip?.effect || ""}
//                                         onChange={(e) =>
//                                             handleActionFieldChange("skip", "effect", e.target.value)
//                                         }
//                                         rows={2}
//                                         className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition resize-none"
//                                         placeholder="e.g., Skip one daily task"
//                                     />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//
//                     {/* Boost Action Card */}
//                     <div
//                         className={`border-2 rounded-xl p-5 transition cursor-pointer ${
//                             activeAction === "boost"
//                                 ? "border-green-500 bg-green-50"
//                                 : "border-gray-200 hover:border-green-300"
//                         }`}
//                         onClick={() => handleActionToggle("boost")}
//                     >
//                         <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center gap-2">
//                                 <div className="p-2 bg-green-100 rounded-lg">
//                                     <Zap className="w-5 h-5 text-green-600" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-gray-800 text-sm">Boost Action</h4>
//                                     <p className="text-xs text-gray-500">تسريع أو زيادة عائد</p>
//                                 </div>
//                             </div>
//                             <div
//                                 className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
//                                     activeAction === "boost"
//                                         ? "border-green-500 bg-green-500"
//                                         : "border-gray-300"
//                                 }`}
//                             >
//                                 {activeAction === "boost" && (
//                                     <div className="w-2.5 h-2.5 bg-white rounded-full" />
//                                 )}
//                             </div>
//                         </div>
//
//                         {activeAction === "boost" && (
//                             <div className="space-y-3 mt-3" onClick={(e) => e.stopPropagation()}>
//                                 <div>
//                                     <label className="text-xs font-semibold text-gray-700 mb-1 block">
//                                         Cost (Credits)
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={formData.actions?.boost?.cost || ""}
//                                         onChange={(e) =>
//                                             handleActionFieldChange(
//                                                 "boost",
//                                                 "cost",
//                                                 parseInt(e.target.value) || 0
//                                             )
//                                         }
//                                         className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
//                                         placeholder="e.g., 3"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-xs font-semibold text-gray-700 mb-1 block">
//                                         Effect Description
//                                     </label>
//                                     <textarea
//                                         value={formData.actions?.boost?.effect || ""}
//                                         onChange={(e) =>
//                                             handleActionFieldChange("boost", "effect", e.target.value)
//                                         }
//                                         rows={2}
//                                         className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition resize-none"
//                                         placeholder="e.g., Increase ROI"
//                                     />
//                                 </div>
//
//                                 {/* Boost Type Selection */}
//                                 <div className="border-t border-gray-200 pt-3 mt-3">
//                                     <label className="text-xs font-semibold text-gray-700 mb-2 block">
//                                         Boost Type
//                                     </label>
//                                     <div className="grid grid-cols-2 gap-2">
//                                         {/* ROI Boost */}
//                                         <button
//                                             type="button"
//                                             onClick={() => handleBoostTypeChange("roi")}
//                                             className={`p-2.5 border-2 rounded-lg transition ${
//                                                 boostType === "roi"
//                                                     ? "border-green-500 bg-green-100"
//                                                     : "border-gray-200 hover:border-green-300"
//                                             }`}
//                                         >
//                                             <div className="flex items-center justify-center gap-1 mb-2">
//                                                 <TrendingUp className="w-4 h-4 text-green-600" />
//                                                 <p className="text-xs font-semibold">ROI Boost</p>
//                                             </div>
//                                             {boostType === "roi" && (
//                                                 <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
//                                                     <div className="flex items-center gap-1">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRoiChange(roiValue - 0.5)}
//                                                             className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
//                                                         >
//                                                             <Minus className="w-3 h-3" />
//                                                         </button>
//                                                         <input
//                                                             type="number"
//                                                             step="0.1"
//                                                             min="0"
//                                                             value={roiValue}
//                                                             onChange={(e) => handleRoiChange(parseFloat(e.target.value) || 0)}
//                                                             className="flex-1 px-1.5 py-1 text-center text-xs border border-gray-200 rounded focus:border-green-500 focus:outline-none min-w-0"
//                                                         />
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleRoiChange(roiValue + 0.5)}
//                                                             className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
//                                                         >
//                                                             <Plus className="w-3 h-3" />
//                                                         </button>
//                                                     </div>
//                                                     <div className="text-center text-xs font-semibold text-green-700 bg-white px-2 py-1 rounded border border-green-200">
//                                                         +{roiValue}%
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </button>
//
//                                         {/* Time Reduction */}
//                                         <button
//                                             type="button"
//                                             onClick={() => handleBoostTypeChange("time")}
//                                             className={`p-2.5 border-2 rounded-lg transition ${
//                                                 boostType === "time"
//                                                     ? "border-blue-500 bg-blue-100"
//                                                     : "border-gray-200 hover:border-blue-300"
//                                             }`}
//                                         >
//                                             <div className="flex items-center justify-center gap-1 mb-2">
//                                                 <Clock className="w-4 h-4 text-blue-600" />
//                                                 <p className="text-xs font-semibold">Time Reduce</p>
//                                             </div>
//                                             {boostType === "time" && (
//                                                 <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
//                                                     <div className="flex items-center gap-1">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleTimeChange(timeValue - 1)}
//                                                             className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
//                                                         >
//                                                             <Minus className="w-3 h-3" />
//                                                         </button>
//                                                         <input
//                                                             type="number"
//                                                             min="1"
//                                                             value={timeValue}
//                                                             onChange={(e) => handleTimeChange(parseInt(e.target.value) || 1)}
//                                                             className="flex-1 px-1.5 py-1 text-center text-xs border border-gray-200 rounded focus:border-blue-500 focus:outline-none min-w-0"
//                                                         />
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleTimeChange(timeValue + 1)}
//                                                             className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
//                                                         >
//                                                             <Plus className="w-3 h-3" />
//                                                         </button>
//                                                     </div>
//                                                     <div className="flex gap-1">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleTimeUnitChange('days')}
//                                                             className={`flex-1 px-1.5 py-0.5 text-xs rounded transition ${
//                                                                 timeUnit === 'days'
//                                                                     ? 'bg-blue-500 text-white'
//                                                                     : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
//                                                             }`}
//                                                         >
//                                                             Days
//                                                         </button>
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleTimeUnitChange('hours')}
//                                                             className={`flex-1 px-1.5 py-0.5 text-xs rounded transition ${
//                                                                 timeUnit === 'hours'
//                                                                     ? 'bg-blue-500 text-white'
//                                                                     : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
//                                                             }`}
//                                                         >
//                                                             Hours
//                                                         </button>
//                                                     </div>
//                                                     <div className="text-center text-xs font-semibold text-blue-700 bg-white px-2 py-1 rounded border border-blue-200">
//                                                         -{timeValue} {timeUnit}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
import { useState, useEffect } from "react";
import { InvestmentPlan } from "@/types/types_investmentPlans.ts";
import { Calendar, Clock, CreditCard, DollarSign, Zap, CheckCircle, TrendingUp, Plus, Minus } from "lucide-react";

export const CreditLimits = ({
                                 formData,
                                 handleInputChange,
                             }: {
    formData: InvestmentPlan;
    handleInputChange: <K extends keyof InvestmentPlan>(
        field: K,
        value: InvestmentPlan[K]
    ) => void;
}) => {
    // Determine the active action from the data
    const determineActiveAction = (): "skip" | "boost" | null => {
        if (formData.actions?.skip) return "skip";
        if (formData.actions?.boost) return "boost";
        return null;
    };

    const [activeAction, setActiveAction] = useState<"skip" | "boost" | null>(
        determineActiveAction()
    );

    // Parse boost values
    const parseBoostValue = (value: string | null | undefined, type: 'roi' | 'time') => {
        if (!value) return { number: 0 };
        if (type === 'roi') {
            const match = value.match(/([+-]?\d+\.?\d*)/);
            return { number: match ? parseFloat(match[1]) : 0 };
        } else {
            const match = value.match(/([+-]?\d+)/);
            return { number: match ? Math.abs(parseInt(match[1])) : 0 };
        }
    };

    const [roiValue, setRoiValue] = useState(() => {
        const parsed = parseBoostValue(formData.actions?.boost?.roiBoost, 'roi');
        return parsed.number;
    });

    const [timeValue, setTimeValue] = useState(() => {
        const parsed = parseBoostValue(formData.actions?.boost?.timeReduction, 'time');
        return parsed.number;
    });

    const [boostType, setBoostType] = useState<"roi" | "time">(() => {
        if (formData.actions?.boost?.roiBoost) return "roi";
        if (formData.actions?.boost?.timeReduction) return "time";
        return "roi";
    });

    // Effect to update state when data is loaded from API
    useEffect(() => {
        const newActiveAction = determineActiveAction();
        setActiveAction(newActiveAction);

        if (formData.actions?.boost) {
            const newBoostType = formData.actions.boost.roiBoost ? "roi" : "time";
            setBoostType(newBoostType);

            // Update ROI value
            if (formData.actions.boost.roiBoost) {
                const parsed = parseBoostValue(formData.actions.boost.roiBoost, 'roi');
                setRoiValue(parsed.number);
            }

            // Update Time value
            if (formData.actions.boost.timeReduction) {
                const parsed = parseBoostValue(formData.actions.boost.timeReduction, 'time');
                setTimeValue(parsed.number);
            }
        }
    }, [formData.actions]);

    const handleActionToggle = (actionType: "skip" | "boost") => {
        if (activeAction === actionType) {
            setActiveAction(null);
            handleInputChange("actions", undefined);
        } else {
            setActiveAction(actionType);
            if (actionType === "skip") {
                handleInputChange("actions", {
                    skip: {
                        cost: 2,
                        effect: "Skip one daily task without penalty",
                        timeReduction: null,
                    },
                });
            } else {
                handleInputChange("actions", {
                    boost: {
                        cost: 3,
                        effect: "Increase ROI temporarily",
                        roiBoost: "1",
                        timeReduction: null,
                    },
                });
                setRoiValue(1);
            }
        }
    };

    const handleActionFieldChange = (
        actionType: "skip" | "boost",
        field: string,
        value: string | number
    ) => {
        if (!formData.actions) return;

        const updatedActions = { ...formData.actions };
        if (actionType === "skip" && updatedActions.skip) {
            updatedActions.skip = { ...updatedActions.skip, [field]: value };
        } else if (actionType === "boost" && updatedActions.boost) {
            updatedActions.boost = { ...updatedActions.boost, [field]: value };
        }
        handleInputChange("actions", updatedActions);
    };

    const handleBoostTypeChange = (type: "roi" | "time") => {
        setBoostType(type);
        if (!formData.actions?.boost) return;

        const updatedActions = {
            boost: {
                ...formData.actions.boost,
                roiBoost: type === "roi" ? `${roiValue}` : null,
                timeReduction: type === "time" ? `${timeValue}` : null,
            },
        };
        handleInputChange("actions", updatedActions);
    };

    const handleRoiChange = (value: number) => {
        const roundedValue = Math.max(0, Math.round(value * 10) / 10);
        setRoiValue(roundedValue);
        if (!formData.actions?.boost) return;

        const updatedActions = {
            boost: {
                ...formData.actions.boost,
                roiBoost: `${roundedValue}`,
            },
        };
        handleInputChange("actions", updatedActions);
    };

    const handleTimeChange = (value: number) => {
        const intValue = Math.max(1, Math.round(value));
        setTimeValue(intValue);
        if (!formData.actions?.boost) return;

        const updatedActions = {
            boost: {
                ...formData.actions.boost,
                timeReduction: `${intValue}`,
            },
        };
        handleInputChange("actions", updatedActions);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Credit Limits Section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    Credit Limits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            Monthly Limit CR
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.monthlyLimitCR || ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "monthlyLimitCR",
                                    parseFloat(e.target.value) || 0
                                )
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                            placeholder="e.g., 15"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Clock className="w-5 h-5 text-purple-600" />
                            Daily Limit CR
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.dailyLimitCR || ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "dailyLimitCR",
                                    parseFloat(e.target.value) || 0
                                )
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                            placeholder="e.g., 2"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            Credit Price (CR)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                $
                            </span>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.creditPrice || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "creditPrice",
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                                placeholder="e.g., 0.5"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-600" />
                        Actions (Select one only)
                    </h3>
                    <div className="flex items-center gap-2">
                        {activeAction && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                Current: {activeAction === "skip" ? "Skip" : boostType === "roi" ? "ROI Boost" : "Time Reduction"}
                            </span>
                        )}
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            activeAction === "skip"
                                ? "bg-orange-100 text-orange-700"
                                : activeAction === "boost"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-500"
                        }`}>
                            {activeAction === "skip"
                                ? "Skip Active"
                                : activeAction === "boost"
                                    ? "Boost Active"
                                    : "No Action"}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Skip Action Card */}
                    <div
                        className={`border-2 rounded-xl p-5 transition cursor-pointer relative ${
                            activeAction === "skip"
                                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                                : "border-gray-200 hover:border-orange-300"
                        }`}
                        onClick={() => handleActionToggle("skip")}
                    >
                        {activeAction === "skip" && (
                            <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                ACTIVE
                            </div>
                        )}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Skip Action</h4>
                                    <p className="text-xs text-gray-500">Skip one daily task without penalty</p>
                                </div>
                            </div>
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    activeAction === "skip"
                                        ? "border-orange-500 bg-orange-500"
                                        : "border-gray-300"
                                }`}
                            >
                                {activeAction === "skip" && (
                                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                )}
                            </div>
                        </div>

                        {activeAction === "skip" && (
                            <div className="space-y-3 mt-3" onClick={(e) => e.stopPropagation()}>
                                <div>
                                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                                        Cost (Credits)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.actions?.skip?.cost || ""}
                                        onChange={(e) =>
                                            handleActionFieldChange(
                                                "skip",
                                                "cost",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition"
                                        placeholder="e.g., 2"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                                        Effect Description
                                    </label>
                                    <textarea
                                        value={formData.actions?.skip?.effect || ""}
                                        onChange={(e) =>
                                            handleActionFieldChange("skip", "effect", e.target.value)
                                        }
                                        rows={2}
                                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition resize-none"
                                        placeholder="e.g., Skip one daily task"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Boost Action Card */}
                    <div
                        className={`border-2 rounded-xl p-5 transition cursor-pointer ${
                            activeAction === "boost"
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-green-300"
                        }`}
                        onClick={() => handleActionToggle("boost")}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Zap className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Boost Action</h4>
                                    <p className="text-xs text-gray-500">Increase ROI or reduce time</p>
                                </div>
                            </div>
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    activeAction === "boost"
                                        ? "border-green-500 bg-green-500"
                                        : "border-gray-300"
                                }`}
                            >
                                {activeAction === "boost" && (
                                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                )}
                            </div>
                        </div>

                        {activeAction === "boost" && (
                            <div className="space-y-3 mt-3" onClick={(e) => e.stopPropagation()}>
                                <div>
                                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                                        Cost (Credits)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.actions?.boost?.cost || ""}
                                        onChange={(e) =>
                                            handleActionFieldChange(
                                                "boost",
                                                "cost",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition"
                                        placeholder="e.g., 3"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                                        Effect Description
                                    </label>
                                    <textarea
                                        value={formData.actions?.boost?.effect || ""}
                                        onChange={(e) =>
                                            handleActionFieldChange("boost", "effect", e.target.value)
                                        }
                                        rows={2}
                                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition resize-none"
                                        placeholder="e.g., Increase ROI"
                                    />
                                </div>

                                {/* Boost Type Selection */}
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <label className="text-xs font-semibold text-gray-700 mb-2 block">
                                        Boost Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {/* ROI Boost */}
                                        <button
                                            type="button"
                                            onClick={() => handleBoostTypeChange("roi")}
                                            className={`p-2.5 border-2 rounded-lg transition ${
                                                boostType === "roi"
                                                    ? "border-green-500 bg-green-100"
                                                    : "border-gray-200 hover:border-green-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-1 mb-2">
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                                <p className="text-xs font-semibold">ROI Boost</p>
                                            </div>
                                            {boostType === "roi" && (
                                                <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRoiChange(roiValue - 0.5)}
                                                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            min="0"
                                                            value={roiValue}
                                                            onChange={(e) => handleRoiChange(parseFloat(e.target.value) || 0)}
                                                            className="flex-1 px-1.5 py-1 text-center text-xs border border-gray-200 rounded focus:border-green-500 focus:outline-none min-w-0"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRoiChange(roiValue + 0.5)}
                                                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <div className="text-center text-xs font-semibold text-green-700 bg-white px-2 py-1 rounded border border-green-200">
                                                        +{roiValue}%
                                                    </div>
                                                </div>
                                            )}
                                        </button>

                                        {/* Time Reduction */}
                                        <button
                                            type="button"
                                            onClick={() => handleBoostTypeChange("time")}
                                            className={`p-2.5 border-2 rounded-lg transition ${
                                                boostType === "time"
                                                    ? "border-blue-500 bg-blue-100"
                                                    : "border-gray-200 hover:border-blue-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-1 mb-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <p className="text-xs font-semibold">Time Reduction</p>
                                            </div>
                                            {boostType === "time" && (
                                                <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTimeChange(timeValue - 1)}
                                                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={timeValue}
                                                            onChange={(e) => handleTimeChange(parseInt(e.target.value) || 1)}
                                                            className="flex-1 px-1.5 py-1 text-center text-xs border border-gray-200 rounded focus:border-blue-500 focus:outline-none min-w-0"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTimeChange(timeValue + 1)}
                                                            className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <div className="text-center text-xs font-semibold text-blue-700 bg-white px-2 py-1 rounded border border-blue-200">
                                                        -{timeValue} days
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};