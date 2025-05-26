import PostList from '@/components/PostList';
import SideMenu from '@/components/SideMenu';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useIsMobile } from '@/hooks/useIsMobie';
import { useState } from 'react';

const PostListPage = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <div className='flex w-full'>
      {/* SideMenu for desktop */}
      {!isMobile && (
        <div className='w-full lg:w-1/5 hidden lg:block'>
          <SideMenu />
        </div>
      )}

      <div className='flex-1'>
        {isMobile && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button className='mt-8 mb-2 '>Fillter or Search</Button>
            </SheetTrigger>
            <SheetContent className='bg-purple-50'>
              <SheetHeader>
                <SheetTitle className='mb-6 '>Fillter and Search</SheetTitle>
              </SheetHeader>
              <SideMenu onAction={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        )}

        <PostList />
      </div>
    </div>
  );
};

export default PostListPage;
