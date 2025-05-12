import Image from '@/components/Image';
import PostMenuActions from '@/components/PostMenuActions';
import Search from '@/components/Search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router';

type Props = {};

const SingerPostPage = (props: Props) => {
  return (
    <div className='flex flex-col gap-8 lg:mx-1 mx-4 mt-4'>
      {/* details */}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-semibold'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written by </span>
            <Link to={'/test'} className='text-blue-700'>
              Join Mater
            </Link>
            <span>on</span>
            <Link to={'/test'} className='text-blue-700'>
              Web designer
            </Link>
            <span>2 days ago</span>
          </div>
          <p className='text-gray-500 font-medium'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
            posuere elit.
          </p>
        </div>
        <div className='hidden lg:block w-2/5'>
          <Image path='/default-image.jpg' className=' rounded-2xl' w={600} />
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* texts */}
        <div className='lg:text-lg text-justify flex flex-col gap-8 '>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
            posuere elit. Donec euismod, nisi vel consectetur interdum, nisl
            nisi bibendum nisi, euismod aliquam nisi nisl euismod nisi. Donec
            euismod, nisi vel consectetur interdum, nisl nisi bibendum nisi,
            euismod aliquam nisi nisl euismod nisi.
          </p>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
            posuere elit. Donec euismod, nisi vel consectetur interdum, nisl
            nisi bibendum nisi, euismod aliquam nisi nisl euismod nisi. Donec
            euismod, nisi vel consectetur interdum, nisl nisi bibendum nisi,
            euismod aliquam nisi nisl euismod nisi.
          </p>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
            posuere elit. Donec euismod, nisi vel consectetur interdum, nisl
            nisi bibendum nisi, euismod aliquam nisi nisl euismod nisi. Donec
            euismod, nisi vel consectetur interdum, nisl nisi bibendum nisi,
            euismod aliquam nisi nisl euismod nisi.
          </p>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
            posuere elit. Donec euismod, nisi vel consectetur interdum, nisl
            nisi bibendum nisi, euismod aliquam nisi nisl euismod nisi. Donec
            euismod, nisi vel consectetur interdum, nisl nisi bibendum nisi,
            euismod aliquam nisi nisl euismod nisi.
          </p>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
            posuere elit. Donec euismod, nisi vel consectetur interdum, nisl
            nisi bibendum nisi, euismod aliquam nisi nisl euismod nisi. Donec
            euismod, nisi vel consectetur interdum, nisl nisi bibendum nisi,
            euismod aliquam nisi nisl euismod nisi.
          </p>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo dui at justo dignissim sodales. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed id
            posuere elit. Donec euismod, nisi vel consectetur interdum, nisl
            nisi bibendum nisi, euismod aliquam nisi nisl euismod nisi. Donec
            euismod, nisi vel consectetur interdum, nisl nisi bibendum nisi,
            euismod aliquam nisi nisl euismod nisi.
          </p>
        </div>

        {/* menu */}
        <div className='px-4 w-3/4 h-max  sticky top-0 hidden lg:block'>
          <h1 className=' mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-2 '>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src='/default-image.jpg' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Link to={'/'}>Join Metar</Link>
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
    </div>
  );
};

export default SingerPostPage;
