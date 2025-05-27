import { useSearchParams } from 'react-router';
import Search from './Search';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface SideMenuProps {
  onAction?: () => void;
}

const SideMenu = ({ onAction }: SideMenuProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChanged = (value: string) => {
    if (searchParams.get('sort') !== value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: value,
      });
    }
    if (onAction) onAction();
  };

  const handleCatChanged = (value: string) => {
    if (searchParams.get('cat') !== value) {
      const params = Object.fromEntries(searchParams.entries());
      delete params.search;
      params.cat = value;
      setSearchParams(params);
    }
    if (onAction) onAction();
  };

  return (
    <div className='px-4 h-max  sticky top-0 '>
      <h1 className=' mb-4 text-sm font-medium'>Search</h1>
      <Search />

      <h1 className='mt-8 mb-4 text-sm font-medium'>Filter</h1>
      <div className='flex flex-col  gap-2 text-sm'>
        <RadioGroup
          defaultValue={searchParams.get('sort') || 'newest'}
          name='sort'
          onValueChange={handleFilterChanged}
        >
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='newest' id='newest' />
            <Label htmlFor='newest' className=' cursor-pointer'>
              Newest
            </Label>
          </div>
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='most-popular' id='most-popular' />
            <Label htmlFor='most-popular' className=' cursor-pointer'>
              Most Popular
            </Label>
          </div>
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='trending' id='trending' />
            <Label htmlFor='trending' className=' cursor-pointer '>
              Trending
            </Label>
          </div>
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='oldest' id='oldest' />
            <Label htmlFor='oldest' className=' cursor-pointer'>
              Oldest
            </Label>
          </div>
        </RadioGroup>
      </div>

      <h1 className=' mt-8 mb-4 text-sm font-medium'>Categories</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <span
          className='underline text-gray-500 cursor-pointer'
          onClick={() => handleCatChanged('general')}
        >
          All
        </span>
        <span
          className='underline text-gray-500 cursor-pointer'
          onClick={() => handleCatChanged('web-design')}
        >
          Web designer
        </span>
        <span
          className='underline text-gray-500 cursor-pointer'
          onClick={() => handleCatChanged('development')}
        >
          Development
        </span>
        <span
          className='underline text-gray-500 cursor-pointer'
          onClick={() => handleCatChanged('database')}
        >
          Database
        </span>
        <span
          className='underline text-gray-500 cursor-pointer'
          onClick={() => handleCatChanged('deep-learning')}
        >
          Deep learning
        </span>
        <span
          className='underline text-gray-500 cursor-pointer'
          onClick={() => handleCatChanged('side-story')}
        >
          Side story
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
