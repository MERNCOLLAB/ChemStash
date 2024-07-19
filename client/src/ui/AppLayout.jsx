import { Outlet } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';
import Header from './Header';

function AppLayout() {
  return (
    <div>
      <div className="sticky top-0 w-full z-10">
        <Header />
      </div>

      <div className="flex">
        <div className="sticky top-[90px] h-[calc(100vh-90px)] min-h-[calc(100vh-90px)] w-[200px] p-7 bg-white0 border">
          <LeftNavbar />
        </div>
        <div className="w-full overflow-y-scroll no-scrollbar bg-white1 min-h-[calc(100vh-90px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
