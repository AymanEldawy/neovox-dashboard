import withLoggedOut from '@/HOC/withLoggedOut';
import { Outlet } from 'react-router-dom';

const PublicLayout = withLoggedOut(() => {
  return (
    <>
      <Outlet />
    </>
  )
})

export default PublicLayout