import { useUser } from '@clerk/clerk-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Props = {};

const WritePage = (props: Props) => {
  const { isLoaded, isSignedIn } = useUser();

  const [value, setValue] = useState('');
  if (!isLoaded) return <div>Loading...</div>;
  if (!isLoaded && !isSignedIn) return <div>You should log in first</div>;

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col gap-6 '>
      <h1 className='text-lg font-light'>Create a New Post</h1>
      <form action='' className='flex flex-col  flex-1 gap-6'>
        <Button className=' w-max bg-white text-gray-500 text-sm'>
          Add a cover image
        </Button>
        <Input
          type='text'
          placeholder='My Awesome Story'
          className=' shadow-none border-none md:text-3xl text-sm  px-0'
        />
        <div className='flex flex-col md:flex-row gap-4'>
          <Label htmlFor='cat' className='w-30  my-auto'>
            Choose a category:{' '}
          </Label>
          <Select>
            <SelectTrigger className='w-52 bg-white' name='cat' id='cat'>
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
          <ReactQuill
            theme='snow'
            value={value}
            onChange={setValue}
            className=' rounded-md bg-white'
          />
        </div>
        <Button
          type='submit'
          className='bg-blue-800 w-max px-6 hover:bg-blue-500 '
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default WritePage;
