import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
