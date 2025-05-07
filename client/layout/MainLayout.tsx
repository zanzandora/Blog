import Navbar from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

type Props = {};

function MainLayout({}: Props) {
  return (
    <div className='md:px-8 lg:px-16 2xl:px-64'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
