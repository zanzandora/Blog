import { Trash2, Bookmark } from 'lucide-react';
import React from 'react';

type Props = {};

const PostMenuActions = (props: Props) => {
  return (
    <div>
      <h1 className='mt-8 mb-4 text-sm font-medium'>Action</h1>
      <div className='flex items-center gap-2 pb-2 text-sm cursor-pointer'>
        <Bookmark color='blue' />
        <span>Save this post</span>
      </div>
      <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
        <Trash2 color='red' />
        <span>Delete this post</span>
      </div>
    </div>
  );
};

export default PostMenuActions;
