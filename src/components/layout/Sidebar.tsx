import sideMenuItems from '@/data/sideMenuItems';
import { ChevronDownIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { SideMenuItem } from '@/data/sideMenuItems';

/**
 * تصفية عناصر القائمة بناءً على صلاحيات المستخدم
 */
const filterMenuByPermissions = (menuItems: SideMenuItem[], userRole: string): SideMenuItem[] => {
  return menuItems
    .filter((item) => {
      // التحقق من أن المستخدم لديه صلاحية الوصول
      if (item.permissions && item.permissions.length > 0) {
        return item.permissions.includes(userRole);
      }
      return true;
    })
    .map((item) => {
      // إذا كان العنصر لديه عناصر فرعية، تصفيتها أيضاً
      if ('children' in item && item.children && item.children.length > 0) {
        return {
          ...item,
          children: item.children.filter((child) => {
            if (child.permissions && child.permissions.length > 0) {
              return child.permissions.includes(userRole);
            }
            return true;
          }),
        };
      }
      return item;
    })
    .filter((item) => {
      // إزالة المجموعات التي ليس لديها عناصر فرعية بعد التصفية
      if ('children' in item) {
        return item.children && item.children.length > 0;
      }
      return true;
    });
};

const SidebarMenuItem = ({ item, onClose }: { item: any, onClose: () => void }) => {
  const { t } = useTranslation('sidebar');
  const { pathname } = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  const isSubMenuActive = hasChildren ? item.children.some((child: any) => pathname.startsWith(child.path)) : false;
  const [isOpen, setIsOpen] = useState(isSubMenuActive);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex gap-4 capitalize items-center px-4 py-2 rounded-lg transition-colors duration-200 ${isActive
      ? 'bg-[var(--secondary-color)] !text-[var(--primary-color)] font-semibold'
      : '!text-gray-700 hover:bg-[var(--secondary-color)] hover:!text-[var(--primary-color)]'
    }`;

  if (!hasChildren) {
    return (
      <NavLink to={item.path} className={navLinkClassName} onClick={onClose}>
        {item.icon}
        {t(item.name)}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${navLinkClassName({ isActive: isSubMenuActive })} justify-between`}
      >
        <div className="flex gap-4 items-center">
          {item.icon}
          {t(item.name)}
        </div>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
      </button>
      {isOpen && (
        <div className="pl-4 mt-1 space-y-1">
          {item.children.map((child: any) => (
            <NavLink key={child.name} to={child.path} className={navLinkClassName} onClick={onClose}>
              {child.icon}
              {t(child.name)}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { user } = useAuthStore();

  // تصفية عناصر القائمة بناءً على صلاحيات المستخدم
  const filteredMenuItems = useMemo(() => {
    if (!user || !user.role) {
      return sideMenuItems;
    }
    return filterMenuByPermissions(sideMenuItems, user.role);
  }, [user]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed md:!sticky top-0 left-0 !h-screen w-64 bg-white shadow-md flex flex-col z-10 transition-transform duration-300
          ${isOpen ? 'translate-x-0 ' : '-translate-x-full'} md:static md:translate-x-0 md:h-[calc(100vh-64px)]`}
      >
        <nav className="flex-1 px-4 py-6 space-y-2">
          {filteredMenuItems.map(item => (
            <SidebarMenuItem key={item.name} item={item} onClose={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar