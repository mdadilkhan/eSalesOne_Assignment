import { Outlet } from 'react-router-dom';
import MenuBar from '../components/MenuBar';

const Layout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MenuBar />
      <main className="flex-grow px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
