import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import Homepage from '../pages/contents/HomePage';
const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage></NotFoundPage>,
  },
  {
    path: '/',
    element: <Homepage></Homepage>,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
