import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

type Props = {};

const Search = (props: Props) => {
  return (
    <div className='bg-gray-100  rounded-full flex items-center  relative'>
      <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <SearchIcon className='text-gray-500 w-3 h-3' />
      </span>
      <Input
        placeholder='Search a post...'
        className='bg-transparent  rounded-full pl-10  w-full'
      />
    </div>
  );
};

export default Search;
