import Comment from './Comment';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type Props = {};

const Comments = (props: Props) => {
  return (
    <div className='flex flex-col gap-8 lg:w-3/5'>
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <div className='flex items-center justify-between gap-8 w-full'>
        <Textarea
          placeholder='Write a comment...'
          className='w-full bg-white'
        />
        <Button className='bg-blue-800'>Send</Button>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
