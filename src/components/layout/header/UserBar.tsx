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
        className="flex w-full mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="true"
        data-dropdown-placement="bottom"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          alt="user"
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
        />
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
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Earnings
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
