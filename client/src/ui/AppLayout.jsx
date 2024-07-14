import { Outlet } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';

function AppLayout() {
  return (
    <div className="flex">
      <div className="border h-screen w-[200px] p-7">
        <LeftNavbar />
      </div>
      <div className="border overflow-y-scroll no-scrollbar ">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
