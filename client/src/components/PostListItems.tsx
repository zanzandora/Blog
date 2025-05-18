import Image from './Image';
import { Link } from 'react-router';

type postProps = {
  title: string;
  slug: string;
  content: string;
  desc?: string;
  img: string;
  category: string;
  isFeature?: boolean;
  createdAt: string;
  updatedAt?: string;
  user: string;
  visit?: number;
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
        <Link to='/test' className='text-4xl text-gray-800 font-semibold mb-2'>
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
          <span>2 days ago</span>
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
