import PostList from '@/components/PostList';
import SideMenu from '@/components/SideMenu';

const PostListPage = () => {
  return (
    <div className='flex gap-8 mt-8'>
      <div className='w-full lg:w-4/5'>
        <PostList />
      </div>
      <div className='w-full lg:w-1/5'>
        <SideMenu />
      </div>
    </div>
  );
};

export default PostListPage;
