import { useQuery } from '@tanstack/react-query';
import Image from './Image';
import { Link } from 'react-router';
import { Post } from '@/types';
import axios from 'axios';
import { timePassed } from '@/utils/timePassed';
import Loader from './Loader';

type Props = {
  posts: Post[];
};

const FeturedPosts = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['post'],
    queryFn: async (): Promise<Props> => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts?limit=4&feature=true`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // Đảm bảo luôn có 4 slot, slot nào không có post thì là null
  const posts: (Post | null)[] = Array(4)
    .fill(null)
    .map((_, i) => (data.posts && data.posts[i] ? data.posts[i] : null));

  return (
    <div className=' flex lg:flex-row flex-col gap-8 mt-8'>
      {/* First post */}
      <div className='flex flex-col w-full gap-4 lg:w-1/2'>
        {posts[0] ? (
          <>
            {posts[0].img && (
              <Image
                path={posts[0].img}
                alt='Demo Image'
                className='rounded-3xl object-cover'
                w={895}
              />
            )}
            <div className='flex flex-row items-center gap-4'>
              <h1 className='font-mono lg:text-lg'>01.</h1>
              <Link
                to={`/post-list?cat=${encodeURIComponent(posts[0].category)}`}
                className='text-blue-800 lg:text-lg'
              >
                {posts[0].category}
              </Link>
              <span className='text-gray-500'>
                {timePassed(posts[0].createdAt)}
              </span>
            </div>
            <Link
              to={`${posts[0].slug}`}
              className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium text-gray-800 '
            >
              {posts[0].title}
            </Link>
          </>
        ) : (
          <div className='h-48 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400'>
            {/*  để trống */}
          </div>
        )}
      </div>

      {/* Orther post */}
      <div className='flex flex-col w-full gap-4 lg:w-1/2 '>
        {/* one */}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          {posts[1] ? (
            <>
              <div className='w-1/3 aspect-video'>
                {posts[1].img && (
                  <Image
                    path={posts[1].img}
                    alt='Demo Image'
                    className='rounded-3xl object-cover'
                    w={895}
                  />
                )}
              </div>
              <div className='w-2/3'>
                {/* details */}
                <div className='flex flex-row  items-center  gap-4 mb-4'>
                  <h1 className=' font-mono lg:text-lg text-3xl'>02.</h1>
                  <Link
                    to={`/post-list?cat=${encodeURIComponent(
                      posts[1].category
                    )}`}
                    className='text-blue-800 lg:text-lg whitespace-nowrap'
                  >
                    {posts[1].category}
                  </Link>
                  <span className='text-gray-500 lg:text-base text-sm'>
                    {timePassed(posts[1].createdAt)}
                  </span>
                </div>
                <Link
                  to={`${posts[1].slug}`}
                  className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium text-gray-800 '
                >
                  {posts[1].title}
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* two */}
        <div className='  lg:h-1/3 flex justify-between gap-4'>
          {posts[2] ? (
            <>
              <div className='w-1/3 aspect-video'>
                {posts[2].img && (
                  <Image
                    path={posts[2].img}
                    alt='Demo Image'
                    className='rounded-3xl object-cover'
                    w={895}
                  />
                )}
              </div>
              <div className='w-2/3'>
                {/* details */}
                <div className='flex flex-row  items-center  gap-4 mb-4'>
                  <h1 className=' font-mono lg:text-lg text-3xl'>03.</h1>
                  <Link
                    to={`/post-list?cat=${encodeURIComponent(
                      posts[2].category
                    )}`}
                    className='text-blue-800 lg:text-lg whitespace-nowrap'
                  >
                    {posts[2].category}
                  </Link>
                  <span className='text-gray-500 lg:text-base text-sm'>
                    {timePassed(posts[2].createdAt)}
                  </span>
                </div>
                <Link
                  to={`${posts[2].slug}`}
                  className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium text-gray-800 '
                >
                  {posts[2].title}
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* three */}
        <div className='  lg:h-1/3 flex justify-between gap-4'>
          {posts[3] ? (
            <>
              <div className='w-1/3 aspect-video'>
                {posts[3].img && (
                  <Image
                    path={posts[3].img}
                    alt='Demo Image'
                    className='rounded-3xl object-cover'
                    w={895}
                  />
                )}
              </div>
              <div className='w-2/3'>
                {/* details */}
                <div className='flex flex-row  items-center  gap-4 mb-4'>
                  <h1 className=' font-mono lg:text-lg text-3xl'>02.</h1>
                  <Link
                    to={`/post-list?cat=${encodeURIComponent(
                      posts[3].category
                    )}`}
                    className='text-blue-800 lg:text-lg whitespace-nowrap'
                  >
                    {posts[3].category}
                  </Link>
                  <span className='text-gray-500 lg:text-base text-sm'>
                    {timePassed(posts[3].createdAt)}
                  </span>
                </div>
                <Link
                  to={`${posts[3].slug}`}
                  className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium text-gray-800 '
                >
                  {posts[3].title}
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeturedPosts;
