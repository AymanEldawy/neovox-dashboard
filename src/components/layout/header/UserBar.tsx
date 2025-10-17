import { useAuthStore } from "@/store/authStore";
import {useEffect, useState} from "react";

const UserBar = () => {
  const { logout ,user,token,getProfile} = useAuthStore()
  const [open, setOpen] = useState(false);
    useEffect(() => {
        if (token) {
            getProfile();
        }
    }, [token, getProfile]);

  const handleLogout = () => logout();

  return (
    <div className="relative w-full">
        <button
            type="button"
            className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setOpen(!open)}
        >
            <span className="sr-only">Open user menu</span>

            {/* Avatar placeholder with initials */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                {user?.firstName && user?.lastName
                    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                    : "U"}
            </div>
        </button>
      {open ? (
        <div className="z-50 absolute ltr:right-0 rtl:left-0 top-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {user?.firstName}
            </span>
            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
             {user?.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default UserBar;
