import PostList from '@/components/PostList';
import SideMenu from '@/components/SideMenu';

type Props = {};

const PostListPage = (props: Props) => {
  return (
    <div>
      <h1 className='mb-8 text-2xl'>Development Blog</h1>
      <div className='flex gap-8'>
        <div className='w-full lg:w-4/5'>
          <PostList />
        </div>
        <div className='w-full lg:w-1/5'>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
