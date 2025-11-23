import PERMISSIONS from "@/data/permissions";

/**
 * دالة للتحقق من أن المستخدم لديه صلاحية الوصول لمسار معين
 * @param path المسار المراد التحقق منه
 * @param userRole دور المستخدم الحالي
 * @returns true إذا كان لديه صلاحية، false إذا لم يكن لديه
 */
export const hasPermission = (path: string, userRole: string): boolean => {
    const requiredRoles = PERMISSIONS[path as keyof typeof PERMISSIONS];

    // إذا لم تكن هناك صلاحيات محددة، السماح بالوصول
    if (!requiredRoles || requiredRoles.length === 0) {
        return true;
    }

    // التحقق من أن المستخدم لديه الدور المناسب
    return requiredRoles.includes(userRole);
};

/**
 * دالة لتصفية عناصر القائمة بناءً على صلاحيات المستخدم
 * @param menuItems عناصر القائمة
 * @param userRole دور المستخدم الحالي
 * @returns عناصر القائمة المصفاة
 */
export const filterMenuByPermissions = <T extends { path?: string; children?: T[] }>(
    menuItems: T[],
    userRole: string
): T[] => {
    return menuItems
        .filter((item) => {
            // إذا كان العنصر لديه مسار، التحقق من الصلاحية
            if (item.path) {
                return hasPermission(item.path, userRole);
            }
            // إذا لم يكن لديه مسار، السماح به (مثل العناوين)
            return true;
        })
        .map((item) => {
            // إذا كان العنصر لديه عناصر فرعية، تصفيتها أيضاً
            if (item.children && item.children.length > 0) {
                return {
                    ...item,
                    children: filterMenuByPermissions(item.children, userRole),
                };
            }
            return item;
        })
        .filter((item) => {
            // إزالة العناصر التي ليس لديها عناصر فرعية بعد التصفية
            if (item.children !== undefined) {
                return item.children.length > 0 || item.path;
            }
            return true;
        });
};
