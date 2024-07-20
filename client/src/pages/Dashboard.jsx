import { BsBoxes } from 'react-icons/bs';
import { GiMaterialsScience } from 'react-icons/gi';
import { IoWarningOutline } from 'react-icons/io5';
import { FaSkullCrossbones } from 'react-icons/fa';
import { DashBoardCard, SupplyBarChart, ConsumptionAreaChart, HazardsPieChart, LocationPieChart } from '../ui';

function Dashboard() {
  return (
    <div className="w-full  p-2  mt-2">
      <div className="flex flex-wrap justify-between gap-2 ">
        <div className="border bg-gray0 p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <GiMaterialsScience />
          </div>
          <div className="flex-1">
            <DashBoardCard title="Total Chemicals" />
          </div>
        </div>

        <div className="border bg-gray0 p-3 flex items-center gap-2 flex-grow ">
          <div className="text-4xl">
            <IoWarningOutline />
          </div>
          <div className="flex-1 ">
            <DashBoardCard query="low-amount" title="Chemicals Running Low" />
          </div>
        </div>
        <div className="border bg-gray0 p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <BsBoxes />
          </div>
          <div className="flex-1">
            <DashBoardCard query="out-of-stock" title="Out of Stock" />
          </div>
        </div>
        <div className="border bg-gray0 p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <FaSkullCrossbones />
          </div>
          <div className="flex-1">
            <DashBoardCard query="expired" title="Expired Chemicals" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-1 ">
        <div className="md:h-[350px] mt-2 p-3 col-span-2   ">
          <ConsumptionAreaChart />
        </div>
        <div className="md:h-[350px] min-h-auto   col-span-1  mt-2 p-3   ">
          <HazardsPieChart />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-2 ">
        <div className=" h-[300px] mt-2 p-3 col-span-2   ">
          <SupplyBarChart />
        </div>
        <div className="md:h-[300px] min-h-auto col-span-1 flex  mt-2 p-3   ">
          <LocationPieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
