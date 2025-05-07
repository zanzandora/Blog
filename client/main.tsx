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
        path: '/LoginPage',
        element: <LoginPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/PostListPage',
        element: <PostListPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/RegisterPage',
        element: <RegisterPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/:slug',
        element: <SingerPostPage />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: '/WritePage',
        element: <WritePage />,
        errorElement: <div>404 Not Found</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
