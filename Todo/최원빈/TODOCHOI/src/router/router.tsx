import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/contents/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';
import TodoPage from '../pages/contents/TodoPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 공통 레이아웃
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/home', element: <Homepage /> },
      { path: '/todo', element: <TodoPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
