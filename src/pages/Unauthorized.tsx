import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PATHS from "@/data/paths";
import { ShieldX, Home } from "lucide-react";

/**
 * صفحة تظهر عندما يحاول المستخدم الوصول إلى صفحة ليس لديه صلاحية للوصول إليها
 */
const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                        <ShieldX className="w-16 h-16 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    غير مصرح بالوصول
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    عذراً، ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة.
                    يرجى التواصل مع المسؤول إذا كنت تعتقد أن هذا خطأ.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <span>العودة للخلف</span>
                    </Button>

                    <Button
                        onClick={() => navigate(PATHS.DASHBOARD)}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        <Home className="w-4 h-4" />
                        <span>الصفحة الرئيسية</span>
                    </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        رمز الخطأ: 403 - Forbidden
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
