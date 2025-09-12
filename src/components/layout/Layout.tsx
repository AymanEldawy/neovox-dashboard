import withLoggedOut from '@/HOC/withLoggedOut';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const Layout = withLoggedOut(() => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
})

export default Layout