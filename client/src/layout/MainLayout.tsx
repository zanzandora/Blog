import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className='md:px-8 lg:px-16 xl:px-64 '>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default MainLayout;
