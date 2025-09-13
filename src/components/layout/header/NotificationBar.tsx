import { BellIcon } from "lucide-react";
import { useState } from "react";

const NotificationBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {open ? (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-black opacity-75"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <button
        className="p-2 rounded-full hover:bg-[#0002] relative"
        onClick={() => setOpen(true)}
      >
        <BellIcon />
      </button>

      {open ? (
        <ul className="absolute bg-white right-0 rtl:left-0 rtl:right-auto dark:bg-dark-bg p-3 px-6 min-w-[200px] shadow rounded-md top-12 z-20 text-gray-500 dark:text-gray-200 text-sm flex flex-col gap-3">
          {/* <li>
            <NotificationCard />
          </li>
          <li>
            <NotificationCard />
          </li>
          <li>
            <NotificationCard />
          </li>
          <li>
            <NotificationCard />
          </li> */}
          <li className="p-4 px-2 text-center text-base">
            <p>Hey! You have no notifications</p>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default NotificationBar;
