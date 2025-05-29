import { useAuth, useUser } from '@clerk/clerk-react';
import 'react-quill-new/dist/quill.snow.css';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@/components/Loader';
import { Post } from '@/types';
import WriteForm, { WriteFormValues } from '@/components/WriteForm';

const WritePage = () => {
  const { slug } = useParams();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const navigate = useNavigate();

  // Kiểm tra chế độ edit
  const isEditMode = !!slug;

  // Fetch bài viết hiện tại nếu ở chế độ edit
  const {
    data: currentPost,
    isLoading: isPostLoading,
    isError,
  } = useQuery({
    queryKey: ['post', slug],
    queryFn: async (): Promise<Post> => {
      if (!slug) throw { notFound: true };
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${slug}/edit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    retry: 1,
    enabled: isEditMode && !!user, // Chỉ fetch khi có id và user
  });

  // Kiểm tra quyền sở hữu
  const isOwner = currentPost
    ? currentPost.user.clerkUserId === user?.id
    : true; // Default là true nếu chưa có post

  // Kiểm tra quyền admin
  const isAdmin = user?.publicMetadata?.role === 'admin' || false;

  useEffect(() => {
    if (currentPost) {
      // Kiểm tra quyền sở hữu
      if (!isPostLoading && !isError && !isOwner && !isAdmin) {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'You are not the owner of this post',
        });
        navigate('/');
      }
    }
  }, [currentPost, isOwner, toast, navigate, isError, isPostLoading, isAdmin]);

  // Mutation để tạo hoặc cập nhật
  const mutation = useMutation({
    mutationFn: async (newPost: WriteFormValues) => {
      const token = await getToken();
      const url = isEditMode
        ? `${import.meta.env.VITE_API_URL}/posts/${currentPost?._id}`
        : `${import.meta.env.VITE_API_URL}/posts`;

      const method = isEditMode ? 'put' : 'post';

      return axios[method](url, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['post', slug] });
      const action = isEditMode ? 'updated' : 'created';
      toast({
        className: 'bg-green-500 text-white',
        title: `Post ${action} successfully`,
      });
      navigate(`/${res.data.slug}`);
    },

    onError: () => {
      const action = isEditMode ? 'updating' : 'creating';
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem when ${action} your post `,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    },
  });

  if (!isSignedIn) return <div>You should log in first</div>;

  if (isEditMode && isPostLoading) {
    return <Loader />;
  }

  if (isEditMode && !isPostLoading && !currentPost) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-red-500 text-lg font-semibold'>
          Post not found or has been deleted.
        </p>
      </div>
    );
  }

  if (isEditMode && !isOwner && !isAdmin) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>You don't have permission to edit this post</p>
      </div>
    );
  }

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col gap-6 '>
      <h1 className='text-lg font-light'>
        {isEditMode ? 'Edit Post' : 'Create a New Post'}
      </h1>
      <WriteForm
        initialData={currentPost}
        isSubmitting={mutation.isPending}
        onSubmit={(data) => mutation.mutate(data)}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default WritePage;
