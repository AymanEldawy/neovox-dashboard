import { WEBSITE_NAME } from "@/data/constants";
import { Link } from "react-router-dom";
import { IconsBar } from "./IconsBar";
import { useEffect, useState } from "react";

const Menu = ({ setSidebarOpen, withoutContainer = false, hideLinks = false }: { setSidebarOpen?: (value: boolean) => void, withoutContainer?: boolean, hideLinks?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white flex items-center justify-between border-b-2 border-gray-200 py-3 h-16 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className={withoutContainer ? "w-full px-6" : "container"}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {setSidebarOpen ? (
              <button
                className="md:hidden bg-white p-2 rounded shadow"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            ) : null}
            <Link to="/" className="flex items-center gap-3">
              <svg className="h-8 w-8 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                  d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V10H23V12C23 13.1046 22.1046 14 21 14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14H3C1.89543 14 1 13.1046 1 12V10H3V6ZM5 6H19V18H5V6ZM7 16C7.55228 16 8 15.5523 8 15C8 14.4477 7.55228 14 7 14C6.44772 14 6 14.4477 6 15C6 15.5523 6.44772 16 7 16ZM18 15C18 15.5523 17.5523 16 17 16C16.4477 16 16 15.5523 16 15C16 14.4477 16.4477 14 17 14C17.5523 14 18 14.4477 18 15Z"
                  fill-rule="evenodd"></path>
              </svg>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">{WEBSITE_NAME}</h1>
            </Link>
          </div>
          <IconsBar />
        </div>
      </div>
    </header>
  )
}

export default Menu