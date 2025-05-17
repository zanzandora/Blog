import { useAuth, useUser } from '@clerk/clerk-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useNavigate } from 'react-router-dom';
import Uploader from '@/components/Uploader';
import Loader from '@/components/Loader';

type NewPost = {
  title: FormDataEntryValue | null;
  desc: FormDataEntryValue | null;
  category: FormDataEntryValue | null;
  content: string;
};

const WritePage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [progress, setProgress] = useState<number>(0);

  const [cover, setCover] = useState('');
  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');

  const [value, setValue] = useState('');
  const { toast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (img) setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    if (video)
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost: NewPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: (res: any) => {
      toast({
        className: 'bg-green-500 text-white',
        title: 'Post created successfully',
      });
      navigate(`/${res.data.slug}`);
    },

    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem when creating your post ',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    },
  });

  if (!isLoaded) return <Loader />;
  if (!isLoaded && !isSignedIn) return <div>You should log in first</div>;

  const handerSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPost = {
      title: formData.get('title'),
      desc: formData.get('desc'),
      category: formData.get('category'),
      content: value,
    };
    console.log(newPost);
    mutation.mutate(newPost);
  };

  console.log(cover);

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col gap-6 '>
      <h1 className='text-lg font-light'>Create a New Post</h1>
      <form
        onSubmit={handerSubmit}
        action=''
        className='flex flex-col  flex-1 gap-6'
      >
        <Uploader type='image' setData={setCover} onProgress={setProgress}>
          <Button
            type='button'
            variant={'ghost'}
            className=' w-max bg-white text-gray-500 text-sm'
          >
            Add a cover image
          </Button>
        </Uploader>
        {progress > 0 && progress < 100 && (
          <div className='w-full bg-gray-200 rounded h-3 mt-2'>
            <div
              className='bg-blue-600 h-3 rounded'
              style={{ width: `${progress}%` }}
            ></div>
            <div className='text-xs text-gray-700 mt-1'>{progress}%</div>
          </div>
        )}

        <Input
          type='text'
          placeholder='My Awesome Story'
          className=' shadow-none border-none md:text-3xl text-sm  px-0'
          name='title'
        />

        <div className='flex flex-col md:flex-row gap-4'>
          <Label htmlFor='cat' className='w-30  my-auto'>
            Choose a category:{' '}
          </Label>
          <Select name='category'>
            <SelectTrigger className='w-52 bg-white' id='cat'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='general'>General</SelectItem>
                <SelectItem value='web-design'>Web Design</SelectItem>
                <SelectItem value='development'>Development</SelectItem>
                <SelectItem value='database'>Database</SelectItem>
                <SelectItem value='deep-learning'>Deep Learning</SelectItem>
                <SelectItem value='side-story'>Side Story</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          name='desc'
          id=''
          placeholder='A Short Description'
          className='bg-white '
        />
        <div>
          <div className='flex flex-1 '>
            <div className='flex flex-col gap-2 mr-2'>
              <Uploader type='image' setData={setImg}>
                🌆
              </Uploader>
              <Uploader type='video' setData={setVideo}>
                ▶️
              </Uploader>
            </div>
            <ReactQuill
              theme='snow'
              value={value}
              modules={{
                toolbar: {
                  container: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['link', 'image', 'video'],
                    ['code-block'],
                    ['clean'],
                  ],
                },
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'indent',
                'link',
                'image',
                'video',
                'code-block',
              ]}
              onChange={setValue}
              className=' rounded-md bg-white flex-1'
            />
          </div>
        </div>
        <Button
          type='submit'
          disabled={mutation.isPending}
          className='bg-blue-800 w-max px-6 hover:bg-blue-500 disabled:bg-blue-800'
        >
          {mutation.isPending ? 'Loading...' : 'Send'}
        </Button>
        {mutation.isError && (
          <div className='text-red-500'>
            {mutation.error instanceof Error
              ? mutation.error.message
              : String(mutation.error)}{' '}
          </div>
        )}
      </form>
    </div>
  );
};

export default WritePage;
