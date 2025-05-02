import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/useIsMobie';

export default function Navbar() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuLinks = (
    <>
      {/* Home */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild className='text-black'>
          <Link
            to='/'
            className='px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors'
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Docs with submenu */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className='p-4 w-48'>
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to='/trending'
                  className='block px-2 py-1 rounded hover:bg-gray-100'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trending
                </Link>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <Link
                  to='/docs/components'
                  className='block px-2 py-1 rounded hover:bg-gray-100'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Most Popular
                </Link>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* About */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild className='text-black'>
          <Link
            to='/about'
            className='px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors'
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* External Link */}
      <NavigationMenuItem>
        <Button
          className='rounded-full bg-blue-500 hover:bg-blue-800'
          onClick={() => setMobileMenuOpen(false)}
        >
          Login
        </Button>
      </NavigationMenuItem>
    </>
  );

  return (
    <nav className='w-full rounded-xl flex items-center justify-between py-4 bg-white shadow px-8 relative'>
      {/* Logo  */}
      <div className='flex items-center'>
        <Link to='/' className='flex items-center'>
          <img
            src='/logo.jpg'
            alt='Logo'
            className='h-10 w-10 mr-3 rounded-full'
          />
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
            className='group flex items-center justify-center relative z-10 [transition:all_0.5s_ease] rounded-[0.375rem] p-1 cursor-pointer  outline-none focus-visible:outline-0 '
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
          {mobileMenuOpen && (
            <div className='absolute top-full right-0 left-0 z-50 bg-white shadow-lg rounded-b-xl animate-fade-in'>
              <NavigationMenu>
                <NavigationMenuList className='flex flex-col items-stretch p-4 space-y-2'>
                  {menuLinks}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
