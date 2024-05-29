import { Outlet } from "react-router-dom";
import LeftNavbar from "./LeftNavbar";

function AppLayout() {
  return (
    <div className="gap-4 mt-4 flex">
      <div className="border p-4 basis-80">
        <LeftNavbar />
      </div>
      <div className="border p-4 w-full  h-[calc(100vh-84px)] overflow-y-scroll ">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
