import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { createBrowserRouter } from 'react-router';
import LoginPage from './routers/LoginPage.tsx';
import PostListPage from './routers/PostListPage.tsx';
import RegisterPage from './routers/RegisterPage.tsx';
import SingerPostPage from './routers/SingerPostPage.tsx';
import WritePage from './routers/WritePage.tsx';
import MainLayout from './layout/MainLayout.tsx';
import HomePage from './routers/HomePage.tsx';
import { ClerkLoading, ClerkProvider, ClerkLoaded } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from './components/Loader.tsx';
import MySavePostPage from './routers/MySavePostPage.tsx';
import ContactPage from './routers/ContactPage.tsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/register',
        element: <RegisterPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/post-list',
        element: <PostListPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/write',
        element: <WritePage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/my-save-post',
        element: <MySavePostPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/contact',
        element: <ContactPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/post-list/:slug',
        element: <SingerPostPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/my-save-post/:slug',
        element: <SingerPostPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/write/:slug',
        element: <WritePage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/:slug',
        element: <SingerPostPage />,
        errorElement: <div>404 Not Found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <ClerkLoading>
      <Loader />
    </ClerkLoading>
    <ClerkLoaded>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ClerkLoaded>
  </ClerkProvider>
);
