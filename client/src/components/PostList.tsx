import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostListItems from './PostListItems';

type Props = {};

const PostList = (props: Props) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
      return res.data;
    },
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  console.log(data);

  return (
    <div className='flex flex-col gap-12 mb-8'>
      <PostListItems />
      <PostListItems />
      <PostListItems />
      <PostListItems />
    </div>
  );
};

export default PostList;
