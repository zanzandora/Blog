import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { useIsMobile } from '@/hooks/useIsMobie';
import { Outlet } from 'react-router';

function MainLayout() {
  const isMobile = useIsMobile();

  return (
    <div className='md:px-8 lg:px-16 xl:px-64 px-4'>
      <Navbar />
      {/* Breadcrumb */}
      {!isMobile && <DynamicBreadcrumb />}
      <Outlet />
      <Toaster />
    </div>
  );
}

export default MainLayout;
