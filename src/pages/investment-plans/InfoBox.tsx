import {AlertCircle} from "lucide-react";

export const InfoBox = () => (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Important Note</p>
                <p className="text-xs text-blue-700">
                    Make sure all investment details are accurate before saving. Changes may affect existing investments.
                </p>
            </div>
        </div>
    </div>
);