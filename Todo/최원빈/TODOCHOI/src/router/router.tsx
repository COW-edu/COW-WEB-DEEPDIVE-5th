import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/contents/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import MainLayout from '../layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 공통 레이아웃
    children: [
      { path: '/', element: <Homepage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
