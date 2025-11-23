import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import PERMISSIONS from "@/data/permissions";
import PATHS from "@/data/paths";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    path: string;
}

/**
 * مكون لحماية المسارات بناءً على صلاحيات المستخدم
 * يتحقق من دور المستخدم الحالي ويسمح بالوصول فقط إذا كان لديه الصلاحية المناسبة
 */
const ProtectedRoute = ({ children, path }: ProtectedRouteProps) => {
    const { user } = useAuthStore();

    // إذا لم يكن المستخدم مسجل دخول، إعادة توجيه لصفحة تسجيل الدخول
    if (!user) {
        return <Navigate to={PATHS.LOGIN} replace />;
    }

    // الحصول على الصلاحيات المطلوبة لهذا المسار
    const requiredRoles = PERMISSIONS[path as keyof typeof PERMISSIONS];

    // إذا لم تكن هناك صلاحيات محددة، السماح بالوصول
    if (!requiredRoles || requiredRoles.length === 0) {
        return <>{children}</>;
    }

    // التحقق من أن المستخدم لديه الدور المناسب
    const hasPermission = requiredRoles.includes(user.role);

    // إذا لم يكن لديه صلاحية، إعادة توجيه لصفحة غير مصرح
    if (!hasPermission) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
