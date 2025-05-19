import Comments from '@/components/Comments';
import Image from '@/components/Image';
import PostMenuActions from '@/components/PostMenuActions';
import Search from '@/components/Search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate, formatTime } from '@/utils/time';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import DOMPurify from 'dompurify';

type Props = {};
type Post = {
  title: string;
  desc: string;
  content: string;
  user: {
    username: string;
    img: string;
  };
  category: string;
  createdAt: Date | string;
  img: string;
  slug: string;
};

const fetchPost = async (slug: string): Promise<Post> => {
  // Thay đổi endpoint phù hợp với backend của bạn
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/${slug}`
  );
  return data;
};

const displayTime = (createdAt: Date | string) => {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(createdAt).getTime();
  const minutes = Math.floor(timeDifference / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return 'Now';
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (days === 1) {
    return 'Yesterday ' + formatTime(createdAt);
  }
  return formatDate(createdAt);
};

const SingerPostPage = (props: Props) => {
  const { slug } = useParams<{ slug: string }>();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug!),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>Post not found</span>;
  }

  return (
    <div className='flex flex-col gap-8 lg:mx-1  mt-4'>
      {/* details */}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-semibold'>
            {data.title}
          </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written by </span>
            <Link to={'/test'} className='text-blue-700'>
              {data.user.username}
            </Link>
            <span>on</span>
            <Link to={'/test'} className='text-blue-700'>
              {data.category}
            </Link>
            <span>{displayTime(data.createdAt)}</span>
          </div>
          <p className='text-gray-500 font-medium'>{data.desc}</p>
        </div>
        <div className='hidden lg:block w-2/5'>
          <Image path={data.img} className=' rounded-2xl' w={600} />
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* texts */}
        <div
          className='lg:text-lg text-justify flex flex-col gap-8 '
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }}
        ></div>

        {/* menu */}
        <div className='px-4 w-3/4 h-max  sticky top-0 hidden lg:block'>
          <h1 className=' mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-2 '>
            <div className='flex items-center gap-2'>
              {data.user.img && (
                <Avatar>
                  <AvatarImage src={data.user.img} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <Link to={'/'}>{data.user.username}r</Link>
            </div>
            <p className='text-gray-500 text-sm py-2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <div className='flex gap-2'>
              <Link to={'/'}>
                <Image path='/facebook.png' w={30} h={30} />
              </Link>
              <Link to={'/'}>
                <Image path='/instagram.png' w={30} h={30} />
              </Link>
            </div>
          </div>
          <PostMenuActions />
          <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
          <div className='flex flex-col gap-2 text-sm'>
            <Link to={'/'} className='underline'>
              All
            </Link>
            <Link to={'/'} className='underline'>
              Web designer
            </Link>
            <Link to={'/'} className='underline'>
              Development
            </Link>
            <Link to={'/'} className='underline'>
              Database
            </Link>
            <Link to={'/'} className='underline'>
              Deep learning
            </Link>
            <Link to={'/'} className='underline'>
              Side story
            </Link>
          </div>
          <h1 className=' mt-8 mb-4 text-sm font-medium'>Search</h1>
          <Search />
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default SingerPostPage;
