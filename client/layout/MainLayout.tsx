import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className='md:px-8 lg:px-16 2xl:px-64'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
