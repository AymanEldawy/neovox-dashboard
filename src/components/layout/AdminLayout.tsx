import withAdminGuard from '@/HOC/withLoggedIn';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import Sidebar from './Sidebar';
import { useState } from 'react';

const AdminLayout = withAdminGuard(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Menu withoutContainer setSidebarOpen={setSidebarOpen} hideLinks />
      <div className='flex'>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:w-[calc(100%-200px)] overflow-y-auto"><Outlet /></main>
      </div>
    </>
  )
})

export default AdminLayout