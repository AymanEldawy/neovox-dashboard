import { useState, useEffect } from "react";
import { InvestmentPlan } from "@/types/types_investmentPlans.ts";
import { Calendar, Clock, CreditCard, DollarSign, Zap, CheckCircle, TrendingUp, Plus, Minus } from "lucide-react";

type ActiveAction = "skip" | "boost" | null;
type BoostType = "roi" | "time";

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
  // تتبع حالة كل action بشكل مستقل
  const [skipEnabled, setSkipEnabled] = useState<boolean>(() => !!formData.actions?.skip);
  const [boostEnabled, setBoostEnabled] = useState<boolean>(() => !!formData.actions?.boost);

  // تتبع حالة كل نوع boost بشكل مستقل
  const [roiEnabled, setRoiEnabled] = useState<boolean>(() =>
    formData.actions?.boost?.roiBoost !== undefined
  );
  const [timeEnabled, setTimeEnabled] = useState<boolean>(() =>
    formData.actions?.boost?.timeReduction !== undefined
  );

  const [roiValue, setRoiValue] = useState<number>(() => {
    return formData.actions?.boost?.roiBoost ?? 1;
  });

  const [timeValue, setTimeValue] = useState<number>(() => {
    return formData.actions?.boost?.timeReduction ?? 1;
  });

  // تحدّث الحالة عند قدوم بيانات من الـ API
  useEffect(() => {
    setSkipEnabled(!!formData.actions?.skip);
    setBoostEnabled(!!formData.actions?.boost);

    if (formData.actions?.boost) {
      const hasRoi = formData.actions.boost.roiBoost !== undefined;
      const hasTime = formData.actions.boost.timeReduction !== undefined;

      setRoiEnabled(hasRoi);
      setTimeEnabled(hasTime);

      if (hasRoi) setRoiValue(formData.actions.boost.roiBoost as number);
      if (hasTime) setTimeValue(formData.actions.boost.timeReduction as number);
    }
  }, [formData.actions]);

  const handleSkipToggle = () => {
    const newSkipEnabled = !skipEnabled;
    setSkipEnabled(newSkipEnabled);

    const updatedActions: any = { ...formData.actions };

    if (newSkipEnabled) {
      updatedActions.skip = {
        cost: 2,
        effect: "Skip one daily task without penalty",
      };
    } else {
      delete updatedActions.skip;
    }

    // إذا لم يكن هناك أي actions، نرسل undefined
    const finalActions = Object.keys(updatedActions).length > 0 ? updatedActions : undefined;
    handleInputChange("actions", finalActions);
  };

  const handleBoostToggle = () => {
    const newBoostEnabled = !boostEnabled;
    setBoostEnabled(newBoostEnabled);

    const updatedActions: any = { ...formData.actions };

    if (newBoostEnabled) {
      // تفعيل boost مع ROI افتراضياً
      setRoiEnabled(true);
      setTimeEnabled(false);
      updatedActions.boost = {
        cost: 3,
        effect: "Increase ROI or reduce time",
        roiBoost: roiValue,
        timeReduction: undefined,
      };
    } else {
      delete updatedActions.boost;
      setRoiEnabled(false);
      setTimeEnabled(false);
    }

    const finalActions = Object.keys(updatedActions).length > 0 ? updatedActions : undefined;
    handleInputChange("actions", finalActions);
  };

  const handleRoiToggle = () => {
    if (!boostEnabled) return;

    const newRoiEnabled = !roiEnabled;
    setRoiEnabled(newRoiEnabled);

    const updatedActions: any = { ...formData.actions };
    if (updatedActions.boost) {
      updatedActions.boost = {
        ...updatedActions.boost,
        roiBoost: newRoiEnabled ? roiValue : undefined,
      };
    }

    handleInputChange("actions", updatedActions);
  };

  const handleTimeToggle = () => {
    if (!boostEnabled) return;

    const newTimeEnabled = !timeEnabled;
    setTimeEnabled(newTimeEnabled);

    const updatedActions: any = { ...formData.actions };
    if (updatedActions.boost) {
      updatedActions.boost = {
        ...updatedActions.boost,
        timeReduction: newTimeEnabled ? timeValue : undefined,
      };
    }

    handleInputChange("actions", updatedActions);
  };

  const handleActionFieldChange = (
    actionType: "skip" | "boost",
    field: string,
    value: string | number
  ) => {
    if (!formData.actions) return;

    const updatedActions: any = { ...formData.actions };

    if (actionType === "skip" && updatedActions.skip) {
      updatedActions.skip = { ...updatedActions.skip, [field]: value };
    } else if (actionType === "boost" && updatedActions.boost) {
      updatedActions.boost = { ...updatedActions.boost, [field]: value };
    }

    handleInputChange("actions", updatedActions);
  };

  const handleRoiChange = (value: number) => {
    const rounded = Math.max(0, Math.round(value * 10) / 10);
    setRoiValue(rounded);
    if (!formData.actions?.boost || !roiEnabled) return;

    const updated = {
      ...formData.actions,
      boost: {
        ...formData.actions.boost,
        roiBoost: rounded,
      },
    } as any;

    handleInputChange("actions", updated);
  };

  const handleTimeChange = (value: number) => {
    const intVal = Math.max(1, Math.round(value));
    setTimeValue(intVal);
    if (!formData.actions?.boost || !timeEnabled) return;

    const updated = {
      ...formData.actions,
      boost: {
        ...formData.actions.boost,
        timeReduction: intVal,
      },
    } as any;

    handleInputChange("actions", updated);
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
              value={formData.monthlyLimitCR ?? ""}
              onChange={(e) =>
                handleInputChange("monthlyLimitCR", parseFloat(e.target.value) || 0 as any)
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
              value={formData.dailyLimitCR ?? ""}
              onChange={(e) =>
                handleInputChange("dailyLimitCR", parseFloat(e.target.value) || 0 as any)
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
                value={formData.creditPrice ?? ""}
                onChange={(e) =>
                  handleInputChange("creditPrice", parseFloat(e.target.value) || 0 as any)
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
            Actions (Can select multiple)
          </h3>
          <div className="flex items-center gap-2">
            {skipEnabled && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">
                Skip ✓
              </span>
            )}
            {boostEnabled && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                Boost ✓
              </span>
            )}
            {!skipEnabled && !boostEnabled && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                No Actions
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skip Action Card */}
          <div
            className={`border-2 rounded-xl p-5 transition cursor-pointer relative ${skipEnabled
                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                : "border-gray-200 hover:border-orange-300"
              }`}
            onClick={handleSkipToggle}
          >
            {skipEnabled && (
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
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${skipEnabled ? "border-orange-500 bg-orange-500" : "border-gray-300"
                  }`}
              >
                {skipEnabled && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
              </div>
            </div>

            {skipEnabled && (
              <div className="space-y-3 mt-3" onClick={(e) => e.stopPropagation()}>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Cost (Credits)
                  </label>
                  <input
                    type="number"
                    value={formData.actions?.skip?.cost ?? ""}
                    onChange={(e) =>
                      handleActionFieldChange("skip", "cost", parseInt(e.target.value) || 0)
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
                    value={formData.actions?.skip?.effect ?? ""}
                    onChange={(e) => handleActionFieldChange("skip", "effect", e.target.value)}
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
            className={`border-2 rounded-xl p-5 transition cursor-pointer relative ${boostEnabled ? "border-green-500 bg-green-50 ring-2 ring-green-200" : "border-gray-200 hover:border-green-300"
              }`}
            onClick={handleBoostToggle}
          >
            {boostEnabled && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                ACTIVE
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Boost Action</h4>
                  <p className="text-xs text-gray-500">Increase ROI and/or reduce time</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${boostEnabled ? "border-green-500 bg-green-500" : "border-gray-300"
                  }`}
              >
                {boostEnabled && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
              </div>
            </div>

            {boostEnabled && (
              <div className="space-y-3 mt-3" onClick={(e) => e.stopPropagation()}>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">
                    Cost (Credits)
                  </label>
                  <input
                    type="number"
                    value={formData.actions?.boost?.cost ?? ""}
                    onChange={(e) =>
                      handleActionFieldChange("boost", "cost", parseInt(e.target.value) || 0)
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
                    value={formData.actions?.boost?.effect ?? ""}
                    onChange={(e) => handleActionFieldChange("boost", "effect", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition resize-none"
                    placeholder="e.g., Increase ROI or reduce time"
                  />
                </div>

                {/* Boost Type Selection - Both can be enabled */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">
                    Boost Types (Can select both)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* ROI Boost */}
                    <button
                      type="button"
                      onClick={handleRoiToggle}
                      className={`p-2.5 border-2 rounded-lg transition ${roiEnabled ? "border-green-500 bg-green-100 ring-2 ring-green-200" : "border-gray-200 hover:border-green-300"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <p className="text-xs font-semibold">ROI Boost</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${roiEnabled ? "border-green-500 bg-green-500" : "border-gray-300"
                            }`}
                        >
                          {roiEnabled && <div className="w-2 h-2 bg-white rounded-sm" />}
                        </div>
                      </div>
                      {roiEnabled && (
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
                              min={0}
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
                      onClick={handleTimeToggle}
                      className={`p-2.5 border-2 rounded-lg transition ${timeEnabled ? "border-blue-500 bg-blue-100 ring-2 ring-blue-200" : "border-gray-200 hover:border-blue-300"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <p className="text-xs font-semibold">Time Reduction</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${timeEnabled ? "border-blue-500 bg-blue-500" : "border-gray-300"
                            }`}
                        >
                          {timeEnabled && <div className="w-2 h-2 bg-white rounded-sm" />}
                        </div>
                      </div>
                      {timeEnabled && (
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
                              min={1}
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

