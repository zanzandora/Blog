import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { timePassed } from '@/utils/timePassed';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';
import { Post } from '@/types';

type commentProps = {
  _id?: string;
  user: {
    username: string;
    img: string;
  };
  desc: string;
  createdAt: Date | string;
};
type Props = {
  comment: commentProps;
  postId?: Post['_id'];
};

const Comment: React.FC<Props> = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const isAdmin = user?.publicMetadata?.role === 'admin' || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },

    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem when delete your post ',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

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
            {user &&
              (comment.user.username ===
                `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
                isAdmin) && (
                <Popover>
                  <PopoverTrigger>. . . </PopoverTrigger>
                  <PopoverContent className='py-2 px-4 w-fit '>
                    <span
                      onClick={handleDelete}
                      className='text-sm  text-red-500 hover:text-red-700 cursor-pointer'
                    >
                      Delete
                    </span>
                  </PopoverContent>
                </Popover>
              )}
            {deleteMutation.isPending && '(in process...)'}
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
