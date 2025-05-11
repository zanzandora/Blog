import React from 'react';
import Image from './Image';
import { Link } from 'react-router';

type Props = {};

const PostListItems = (props: Props) => {
  return (
    <div className='flex flex-col xl:flex-row gap-8   '>
      {/* Image */}
      <div className='md:hidden xl:block xl:w-1/3'>
        <Image path='/postItem.jpg' className='object-cover rounded-lg' />
      </div>

      {/* Details */}
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to='/test' className='text-4xl text-gray-800 font-semibold mb-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu.
        </Link>
        <div className='flex items-center text-gray-400 text-sm gap-2'>
          <span>Write by</span>
          <Link to='/test' className='text-blue-700'>
            Joint Metar
          </Link>
          <span>on</span>
          <Link to='/test' className='text-blue-700'>
            Web designer
          </Link>
          <span>2 days ago</span>
        </div>
        <p className='text-gray-700 '>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
          posuere elit.
        </p>
        <Link to='/test' className=' underline text-blue-700 text-sm'>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;
