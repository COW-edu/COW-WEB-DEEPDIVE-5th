// router/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/contents/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: '', // 공통 레이아웃
    children: [
      { path: '/', element: <Homepage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
