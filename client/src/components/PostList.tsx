import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import PostListItems from './PostListItems';

const PostList = () => {
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: { page: pageParam, limit: 5 },
      });
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

  // Fetch trang đầu tiên khi component mount
  useEffect(() => {
    if (allPosts.length === 0 && !isFetching) {
      fetchNextPage();
    }
  }, []);

  if (isFetching && allPosts.length === 0) return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;

  return (
    <div className='space-y-8'>
      {allPosts.map((post) => (
        <PostListItems key={post._id} post={post} />
      ))}
      {isFetchingNextPage && <div>Loading more posts...</div>}
      {!hasNextPage && <div className='text-center py-4'>No more posts</div>}
    </div>
  );
};

export default PostList;
