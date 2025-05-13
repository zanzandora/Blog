import React from 'react';
import PostListItems from './PostListItems';

type Props = {};

const PostList = (props: Props) => {
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
