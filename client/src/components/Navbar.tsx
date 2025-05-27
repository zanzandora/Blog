import { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/useIsMobie';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Navbar() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const menuLinks = (
    <>
      {/* Home */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild className='text-black'>
          <Link
            to='/'
            className='px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded transition-colors'
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Most Popular */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild className='text-black'>
          <Link
            to='/post-list?sort=most-popular'
            className='px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded transition-colors'
            onClick={() => setMobileMenuOpen(false)}
          >
            Most Poppular
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* About */}
      <SignedIn>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className='text-black'>
            <Link
              to='/my-save-post'
              className='px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded transition-colors'
              onClick={() => setMobileMenuOpen(false)}
            >
              My Save Post
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </SignedIn>

      {/* Contact */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild className='text-black'>
          <Link
            to='/contact'
            className='px-4 py-2 text-lg font-medium hover:bg-gray-100 rounded transition-colors'
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* External Link */}
      <NavigationMenuItem>
        <SignedOut>
          <Link to='/login'>
            <Button
              className='rounded-full bg-blue-500 hover:bg-blue-800'
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </NavigationMenuItem>
    </>
  );

  return (
    <nav className='w-full  rounded-xl flex items-center justify-between py-4 bg-background shadow px-8 relative'>
      {/* Logo  */}
      <div className='flex items-center'>
        <Link to='/' className='flex items-center'>
          <Avatar className='mr-3'>
            <AvatarImage src='/logo.jpg' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='text-lg font-bold text-black'>MyApp</span>
        </Link>
      </div>
      {/* Desktop Menu */}
      {!isMobile && (
        <div>
          <NavigationMenu>
            <NavigationMenuList className='flex items-center space-x-2'>
              {menuLinks}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}

      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <div>
          <button
            className='group flex items-center justify-center relative z-50 [transition:all_0.5s_ease] rounded-[0.375rem] p-1 cursor-pointer  outline-none focus-visible:outline-0 '
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Open menu'
          >
            <svg
              fill='currentColor'
              stroke='none'
              strokeWidth='0'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              className={`w-7 h-7 overflow-visible [transition:transform_.35s_ease]  rotate-45`}
            >
              <path
                className={
                  'transition-transform duration-300' +
                  (mobileMenuOpen
                    ? ' [transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]'
                    : '')
                }
                d='m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z'
              ></path>
              <path
                className={
                  'transition-transform duration-300' +
                  (mobileMenuOpen
                    ? ' [transform:rotate(22.5deg)_translate(15.5%,-23%)]'
                    : '')
                }
                d='m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z'
              ></path>
              <path
                className={
                  'transition-transform duration-300' +
                  (mobileMenuOpen
                    ? ' [transform:rotate(112.5deg)_translate(-15%,-149.5%)]'
                    : '')
                }
                d='m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z'
              ></path>
            </svg>
          </button>
          {/* Mobile Menu Overlay */}
          <div
            className={`fixed inset-0 mt-[73px] z-10 flex items-center justify-center bg-background  transition-all duration-500 ease-in-out transform ${
              mobileMenuOpen
                ? 'translate-x-0 opacity-100 pointer-events-auto'
                : 'translate-x-full opacity-0 pointer-events-none'
            }`}
          >
            <NavigationMenu>
              <NavigationMenuList className='flex flex-col items-center justify-center space-y-6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  '>
                {menuLinks}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </nav>
  );
}
