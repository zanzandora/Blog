import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';

type commentProps = {
  user: {
    username: string;
    img: string;
  };
  desc: string;
  createdAt: Date | string;
};

const fetchComments = async (postId: any): Promise<commentProps[]> => {
  // Thay đổi endpoint phù hợp với backend của bạn
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return data;
};

const Comments = ({ postId }: { postId: any }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment: { desc: FormDataEntryValue | null }) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
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
        description: 'There was a problem when adding your comment ',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    },
  });

  const handerSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newComment = {
      desc: formData.get('desc'),
    };
    mutation.mutate(newComment);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>Comment not found</span>;
  }
  return (
    <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <form
        onSubmit={handerSubmit}
        className='flex items-center justify-between gap-8 w-full'
      >
        <Textarea
          placeholder='Write a comment...'
          className='w-full bg-white'
          name='desc'
        />
        <Button type='submit' className='bg-blue-800'>
          Send
        </Button>
      </form>
      {data.length === 0 ? (
        <div className='text-gray-500 text-sm my-2'>
          Dont have any comment. Be the first one !!
        </div>
      ) : isPending ? (
        'loading...'
      ) : isError ? (
        'Error loading comment'
      ) : (
        <>
          {mutation.isPending && mutation.variables && (
            <Comment
              comment={{
                user: {
                  username: user?.username ?? 'Anonymous',
                  img: user?.imageUrl ?? '', // or a placeholder image
                },
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date().toISOString(),
              }}
            />
          )}
          {data.map((comment: any) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
