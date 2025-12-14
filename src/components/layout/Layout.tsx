import withLoggedIn from '@/HOC/withLoggedIn';
import { useDailyMissionAssignment } from '@/hooks/useDailyMissionAssignment';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './header/Menu';
import Sidebar from './Sidebar';

const Layout = withLoggedIn(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Automatically check and add missions once per day
  useDailyMissionAssignment();

  return (
    <>
      <Menu withoutContainer setSidebarOpen={setSidebarOpen} hideLinks />
      <div className='flex'>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:w-[calc(100%-200px)] overflow-y-auto pt-4"><Outlet /></main>
      </div>
    </>
  )
})

export default Layout