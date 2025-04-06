import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
