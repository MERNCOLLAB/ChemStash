import { Outlet } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';
import Header from './Header';

function AppLayout() {
  return (
    <div>
      <div className="sticky top-0 w-full z-20">
        <Header />
      </div>

      <div className="grid grid-cols-[200px_1fr]">
        <div className="sticky top-[80px]  h-screen bg-white0 max-h-[calc(100vh-82px)] w-[200px] py-7 px-4  border">
          <LeftNavbar />
        </div>
        <div className="  overflow-y-scroll no-scrollbar bg-white1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
