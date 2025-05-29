import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import Uploader from '@/components/Uploader';
import { MediaFile } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

// Schema validation với Zod
const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  desc: z.string().min(1, 'Description is required').max(200),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
  img: z.string().optional(),
});

export type WriteFormValues = z.infer<typeof formSchema>;

type WriteFormProps = {
  initialData?: {
    title?: string;
    desc?: string;
    category?: string;
    content?: string;
    img?: string;
  };
  isSubmitting: boolean;
  onSubmit: (data: WriteFormValues) => void;
  isEditMode?: boolean;
};

const WriteForm = ({
  initialData,
  isSubmitting,
  onSubmit,
  isEditMode = false,
}: WriteFormProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [cover, setCover] = useState<MediaFile | null>(null);
  const [img, setImg] = useState<MediaFile | null>(null);
  const [video, setVideo] = useState<MediaFile | null>(null);
  const { toast } = useToast();

  const form = useForm<WriteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      desc: '',
      category: '',
      content: '',
      img: '',
    },
  });

  const { watch, setValue, handleSubmit, control } = form;
  const content = watch('content');

  useEffect(() => {
    if (initialData?.img) {
      setCover({
        url: initialData.img,
        filePath: initialData.img,
        name: 'Cover image',
      });
      setValue('img', initialData.img);
    }
  }, [initialData, setValue]);

  useEffect(() => {
    if (img?.url) {
      const newContent = content + `<p><image src="${img.url}"/></p>`;
      setValue('content', newContent);
    }
  }, [img, content, setValue]);

  useEffect(() => {
    if (video?.url) {
      const newContent =
        content + `<p><iframe class="ql-video" src="${video.url}"/></p>`;
      setValue('content', newContent);
    }
  }, [video, content, setValue]);

  const handleFormSubmit = (data: WriteFormValues) => {
    onSubmit({
      ...data,
      img: cover?.filePath || '',
    });
  };

  const handleQuillChange = (content: string) => {
    setValue('content', content);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='flex flex-col flex-1 gap-6'
      >
        <Uploader
          type='image'
          setData={setCover}
          onProgress={(percent) => {
            setProgress(percent);
            if (percent === 100 || percent === 0) {
              setTimeout(() => setProgress(0), 1000);
            }
          }}
          onError={(err) => {
            toast({
              className: 'bg-red-500 text-white',
              title: 'Upload failed',
              description: err?.message || 'An error occurred during upload.',
            });
          }}
        >
          <div className='flex items-center gap-3'>
            <Button
              type='button'
              variant={'ghost'}
              className='w-max bg-white text-gray-500 text-sm'
            >
              {cover?.url ? 'Change cover image' : 'Add a cover image'}
            </Button>
            {cover?.url && (
              <img
                src={
                  cover.url.startsWith('http')
                    ? cover.url
                    : `${import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}${
                        cover.url
                      }`
                }
                alt={cover.name || 'cover'}
                className='w-10 h-10 object-cover rounded'
              />
            )}
            {!cover?.url && cover?.name && (
              <span className='text-xs text-gray-500'>{cover.name}</span>
            )}
          </div>
        </Uploader>

        {progress > 0 && (
          <div className='w-full bg-gray-200 rounded h-3 mt-2'>
            <div
              className='bg-blue-600 h-3 rounded'
              style={{ width: `${progress}%` }}
            ></div>
            <div className='text-xs text-gray-700 mt-1'>{progress}%</div>
          </div>
        )}

        <FormField
          control={control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='My Awesome Story'
                  className='shadow-none border-none md:text-3xl text-sm px-0'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-col md:flex-row gap-4'>
                <Label htmlFor='cat' className='w-30 my-auto'>
                  Choose a category:
                </Label>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className='w-52 bg-white' id='cat'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='general'>General</SelectItem>
                      <SelectItem value='web-design'>Web Design</SelectItem>
                      <SelectItem value='development'>Development</SelectItem>
                      <SelectItem value='database'>Database</SelectItem>
                      <SelectItem value='deep-learning'>
                        Deep Learning
                      </SelectItem>
                      <SelectItem value='side-story'>Side Story</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='desc'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder='A Short Description'
                  className='bg-white'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-1'>
                <div className='flex flex-col gap-2 mr-2'>
                  <Uploader type='image' setData={setImg}>
                    🌆
                  </Uploader>
                  <Uploader type='video' setData={setVideo}>
                    ▶️
                  </Uploader>
                </div>
                <FormControl>
                  <ReactQuill
                    theme='snow'
                    value={field.value}
                    onChange={(content) => {
                      field.onChange(content);
                      handleQuillChange(content);
                    }}
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: '1' }, { header: '2' }, { font: [] }],
                          [{ size: [] }],
                          [
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'blockquote',
                          ],
                          [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' },
                          ],
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
                    className='rounded-md bg-white flex-1'
                    readOnly={progress > 0 && progress < 100}
                  />
                </FormControl>
              </div>
              <div className='text-right text-sm text-gray-500 mt-1'>
                {field.value?.length || 0} ký tự
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          className='bg-blue-800 w-max px-6 hover:bg-blue-500 disabled:bg-blue-800'
        >
          {isSubmitting
            ? 'Loading...'
            : isEditMode
            ? 'Update Post'
            : 'Publish Post'}
        </Button>
      </form>
    </Form>
  );
};

export default WriteForm;
