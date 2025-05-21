import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

type Props = {};

const Search = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      const query = e.target.value;
      if (location.pathname === '/post-list') {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      } else {
        navigate(`/post-list?search=${query}`);
      }
    }
  };
  return (
    <div className='bg-gray-100  rounded-full flex items-center  relative'>
      <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <SearchIcon className='text-gray-500 w-3 h-3' />
      </span>
      <Input
        placeholder='Search a post...'
        className='bg-transparent  rounded-full pl-10  w-full'
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
