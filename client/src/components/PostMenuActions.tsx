import { useAuth, useUser } from '@clerk/clerk-react';
import { Trash2, Bookmark } from 'lucide-react';
import { Post } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useNavigate } from 'react-router';

type Props = {
  post: Post;
};

const PostMenuActions = ({ post }: Props) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    isPending,
    isError,
    data: savedPosts,
    error,
  } = useQuery({
    queryKey: ['savePosts'],
    queryFn: async () => {
      const token = await getToken();
      return await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled: !!user,
  });

  const isAdmin = user?.publicMetadata?.role === 'admin' || false;
  const isSaved =
    savedPosts?.data.some((p: string | undefined) => p == post._id) || false;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: () => {
      toast({
        className: 'bg-green-500 text-white',
        title: 'Post created successfully',
      });
      navigate(`/`);
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

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savePosts'] });
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
  const handleSave = () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Can not save this post.',
        description: 'You have to login first ',
        action: <ToastAction altText='Try again'>Come back</ToastAction>,
      });
      return navigate('/login');
    }
    saveMutation.mutate();
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <h1 className='mt-8 mb-4 text-sm font-medium'>Action</h1>
      <div
        onClick={handleSave}
        className='flex items-center gap-2 pb-2 text-sm cursor-pointer'
      >
        <Bookmark
          color='blue'
          fill={(saveMutation.isPending ? !isSaved : isSaved) ? 'blue' : 'none'}
        />
        {saveMutation.isPending ? (
          <span className='text-xs text-gray-400'>Progress...</span>
        ) : (
          <span>Save post</span>
        )}
      </div>
      {user &&
        (post.user.username ===
          `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
          isAdmin) && (
          <div
            onClick={handleDelete}
            className='flex items-center gap-2 py-2 text-sm cursor-pointer'
          >
            <Trash2 color='red' />

            {deleteMutation.isPending ? (
              <span className=' text-xs text-gray-400'>progress...</span>
            ) : (
              <span>Delete post</span>
            )}
          </div>
        )}
    </div>
  );
};

export default PostMenuActions;
