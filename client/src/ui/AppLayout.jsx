import { Outlet } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';

function AppLayout() {
  return (
    <div className="gap-4 mt-4 flex flex-col">
      <div className="border p-4  ">
        <LeftNavbar />
      </div>
      <div className="border p-4 w-full  h-[calc(100vh-84px)]  overflow-y-scroll no-scrollbar ">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
