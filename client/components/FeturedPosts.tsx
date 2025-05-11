import Image from './Image';
import { Link } from 'react-router';

type Props = {};

const FeturedPosts = (props: Props) => {
  return (
    <div className=' flex lg:flex-row flex-col gap-8 mt-8'>
      {/* First post */}
      <div className='flex flex-col w-full gap-4 lg:w-1/2'>
        <Image
          path='/default-image.jpg'
          alt='Demo Image'
          className=' rounded-3xl object-cover'
        />
        {/* details */}
        <div className='flex flex-row  items-center  gap-4'>
          <h1 className=' font-mono lg:text-lg '>01.</h1>
          <Link to={'/'} className='text-blue-800 lg:text-lg '>
            Web designer
          </Link>
          <span className='text-gray-500 '>2 day ago</span>
        </div>
        {/* Title */}
        <h2 className='text-xl lg:text-3xl font-semibold lg:font-bold text-gray-800 '>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        </h2>
      </div>

      {/* Orther post */}
      <div className='flex flex-col w-full gap-4 lg:w-1/2 '>
        {/* one */}
        <div className='  lg:h-1/3 flex justify-between gap-4'>
          {/* Image */}
          <Image
            path='/default-image.jpg'
            alt='Demo Image'
            className=' rounded-3xl object-cover w-1/3 aspect-video'
          />
          <div className='w-2/3'>
            {/* details */}
            <div className='flex flex-row  items-center  gap-4 mb-4'>
              <h1 className=' font-mono lg:text-lg text-3xl'>02.</h1>
              <Link
                to={'/'}
                className='text-blue-800 lg:text-lg whitespace-nowrap'
              >
                Web designer
              </Link>
              <span className='text-gray-500 lg:text-base text-sm'>
                2 day ago
              </span>
            </div>
            <Link
              to={'/'}
              className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium text-gray-800 '
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Link>
          </div>
        </div>

        {/* two */}
        <div className='  lg:h-1/3 flex justify-between gap-4'>
          {/* Image */}
          <Image
            path='/default-image.jpg'
            alt='Demo Image'
            className=' rounded-3xl object-cover w-1/3 aspect-video'
          />
          <div className='w-2/3'>
            {/* details */}
            <div className='flex flex-row  items-center  gap-4 mb-4'>
              <h1 className=' font-mono lg:text-lg text-3xl'>03.</h1>
              <Link
                to={'/'}
                className='text-blue-800 lg:text-lg whitespace-nowrap'
              >
                Web designer
              </Link>
              <span className='text-gray-500 lg:text-base text-sm'>
                2 day ago
              </span>
            </div>
            <Link
              to={'/'}
              className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium text-gray-800 '
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Link>
          </div>
        </div>

        {/* three */}
        <div className='  lg:h-1/3 flex justify-between gap-4'>
          {/* Image */}
          <Image
            path='/default-image.jpg'
            alt='Demo Image'
            className=' rounded-3xl object-cover w-1/3 aspect-video'
          />
          <div className='w-2/3'>
            {/* details */}
            <div className='flex flex-row  items-center  gap-4 mb-4'>
              <h1 className=' font-mono lg:text-lg text-3xl'>04.</h1>
              <Link
                to={'/'}
                className='text-blue-800 lg:text-lg whitespace-nowrap'
              >
                Web designer
              </Link>
              <span className='text-gray-500 lg:text-base text-sm'>
                2 day ago
              </span>
            </div>
            <Link
              to={'/'}
              className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium text-gray-800 '
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeturedPosts;
