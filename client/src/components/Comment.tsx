import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { timePassed } from '@/utils/timePassed';

type commentProps = {
  user: {
    username: string;
    img: string;
  };
  desc: string;
  createdAt: Date | string;
};

const Comment = ({ comment }: { comment: commentProps }) => {
  return (
    <div>
      <Card>
        <CardHeader className='p-4 -mb-4'>
          <CardTitle className='flex items-center gap-4'>
            <Avatar>
              <AvatarImage src={comment.user.img} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className=' font-medium'>{comment.user.username}</span>
            <span className=' text-gray-500 text-sm'>
              {timePassed(comment.createdAt)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <p>{comment.desc}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;
