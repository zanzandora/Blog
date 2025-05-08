import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router';
import Category from '@/components/Category';
import FeturedPosts from '@/components/FeturedPosts';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      {/* BREADCRUMBS */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/login'>Login</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* INTRODUCTION */}
      <div className='flex   items-center justify-between'>
        {/* title */}
        <div>
          <h1 className='text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <p className='text-lg text-gray-700 mt-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            eleifend nunc diam, sed dictum lacus.
          </p>
        </div>
        {/* write page button */}
        <Link to='write' className='hidden md:block relative'>
          <svg
            viewBox='0 0 200 200'
            width='180'
            height='180'
            // className='text-lg tracking-widest animate-spin super-slow-spin'
            className='text-lg tracking-widest'
          >
            <path
              id='circlePath'
              fill='none'
              d='M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0'
            />
            <text>
              <textPath href='#circlePath' startOffset='0%'>
                Write your story •
              </textPath>
              <textPath href='#circlePath' startOffset='50%'>
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className='absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='50'
              height='50'
              fill='none'
              stroke='white'
              strokeWidth='2'
            >
              <line x1='6' y1='18' x2='18' y2='6' />
              <polyline points='9 6 18 6 18 15' />
            </svg>
          </button>
        </Link>
      </div>
      {/* CATEGORIES */}
      <Category />
      {/* FETURED POSTS */}
      <FeturedPosts />
      {/* POST LIST */}
    </div>
  );
};

export default HomePage;
