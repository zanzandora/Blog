import Image from './Image';
import { Link } from 'react-router';
import { formatDate, formatTime } from '@/utils/time';

type postProps = {
  title: string;
  slug: string;
  content: string;
  desc?: string;
  img: string;
  category: string;
  isFeature?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  user: string;
  visit?: number;
};

const calTime = (createdAt: Date) => {
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

const PostListItems = ({ post }: { post: postProps }) => {
  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-12  min-h-20'>
      {/* Image */}
      <div className='md:hidden xl:block xl:w-1/3'>
        <Image path={post.img} className='object-cover rounded-lg ' w={735} />
      </div>

      {/* Details */}
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link
          to={`${post.slug}`}
          className='text-4xl text-gray-800 font-semibold mb-2'
        >
          {post.title || ''}
        </Link>
        <div className='flex items-center text-gray-400 text-sm gap-2'>
          <span>Write by</span>
          <Link to='/test' className='text-blue-700'>
            Joint Metar
          </Link>
          <span>on</span>
          <Link to='/test' className='text-blue-700'>
            {post.category || 'general'}
          </Link>
          <span>{calTime(post.createdAt)}</span>
        </div>
        <p className='text-gray-700 '>{post.desc || ''}</p>
        <Link to={`${post.slug}`} className=' underline text-blue-700 text-sm'>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;
