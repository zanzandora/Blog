import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router';
import Search from './Search';

type Props = {};

const Category = (props: Props) => {
  return (
    <div className='hidden md:flex bg-gray-50 rounded-3xl xl:rounded-full gap-8  py-4 px-8  flex-wrap shadow-lg  items-center justify-between text-sm  '>
      <div className='flex-1 items-center justify-between  flex '>
        <Link
          to={'/post-list?cat=general'}
          className='bg-blue-700 text-white rounded-full px-4 py-2 whitespace-nowrap'
        >
          All post
        </Link>
        <Link
          to={'/post-list?cat=web-design'}
          className='hover:bg-blue-50 text-gray-800 rounded-full px-4 py-2 whitespace-nowrap'
        >
          Web designer
        </Link>
        <Link
          to={'/post-list?cat=development'}
          className='hover:bg-blue-50 text-gray-800 rounded-full px-4 py-2 whitespace-nowrap'
        >
          Development
        </Link>
        <Link
          to={'/post-list?cat=database'}
          className='hover:bg-blue-50 text-gray-800 rounded-full px-4 py-2 whitespace-nowrap'
        >
          Database
        </Link>
        <Link
          to={'/post-list?cat=deep-learning'}
          className='hover:bg-blue-50 text-gray-800 rounded-full px-4 py-2 whitespace-nowrap'
        >
          Deep learning
        </Link>
        <Link
          to={'/post-list?cat=side-story'}
          className='hover:bg-blue-50 text-gray-800 rounded-full px-4 py-2 whitespace-nowrap'
        >
          Side story
        </Link>
      </div>
      <Separator
        orientation='vertical'
        className='p-[1.5px] h-5 rounded-sm bg-black'
      />
      <div className='relative w-full max-w-fit'>
        <Search />
      </div>
    </div>
  );
};

export default Category;
