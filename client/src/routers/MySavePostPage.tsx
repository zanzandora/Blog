import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import PostListItems from '@/components/PostListItems';
import type { Post } from '@/types';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

const MySavePostPage = () => {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/saved-posts`,
        {
          params: { page: pageParam, limit: 10 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // Lấy tất cả bài viết
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  // Xử lý scroll window để fetch thêm dữ liệu
  const handleScroll = useCallback(() => {
    // Tính toán vị trí scroll hiện tại
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Nếu scroll gần đến cuối (còn 200px) và có trang tiếp theo, không đang fetch
    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Thêm event listener khi component mount/unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (isFetching && allPosts.length === 0) return <Loader />;
  if (status === 'error') return <Error message={error.message} />;

  if (!isLoaded) return <Loader />;
  if (!isLoaded && !isSignedIn) return <div>You should log in first</div>;

  return (
    <div className='mt-8'>
      {allPosts.map((post: Post) => (
        <PostListItems key={post._id} post={post} />
      ))}
      {isFetchingNextPage && <div>Loading more posts...</div>}
      {!hasNextPage && <div className='text-center py-4'>No more posts</div>}
    </div>
  );
};

export default MySavePostPage;
