import { Link, useSearchParams } from 'react-router';
import Search from './Search';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

type Props = {};

const SideMenu = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChanged = (value: string) => {
    if (searchParams.get('sort') !== value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: value,
      });
    }
  };

  return (
    <div className='px-4 h-max  sticky top-0 hidden lg:block'>
      <h1 className=' mb-4 text-sm font-medium'>Search</h1>
      <Search />

      <h1 className='mt-8 mb-4 text-sm font-medium'>Filter</h1>
      <div className='flex flex-col  gap-2 text-sm'>
        <RadioGroup
          defaultValue={searchParams.get('sort')!}
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
        <Link to={'/'} className='underline text-gray-500'>
          All
        </Link>
        <Link to={'/'} className='underline text-gray-500'>
          Web designer
        </Link>
        <Link to={'/'} className='underline text-gray-500'>
          Development
        </Link>
        <Link to={'/'} className='underline text-gray-500'>
          Database
        </Link>
        <Link to={'/'} className='underline text-gray-500'>
          Deep learning
        </Link>
        <Link to={'/'} className='underline text-gray-500'>
          Side story
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
