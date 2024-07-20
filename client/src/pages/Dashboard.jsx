import { BsBoxes } from 'react-icons/bs';
import { GiMaterialsScience } from 'react-icons/gi';
import { IoWarningOutline } from 'react-icons/io5';
import { FaSkullCrossbones } from 'react-icons/fa';
import { DashBoardCard, SupplyBarChart, ConsumptionAreaChart, HazardsPieChart } from '../ui';

function Dashboard() {
  return (
    <div className="w-full  p-2  mt-2">
      <div className="flex flex-wrap justify-between gap-2 ">
        <div className="border p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <GiMaterialsScience />
          </div>

          <div className="flex-1">
            <DashBoardCard title="Total Chemicals" />
          </div>
        </div>

        <div className="border p-3 flex items-center gap-2 flex-grow ">
          <div className="text-4xl">
            <IoWarningOutline />
          </div>

          <div className="flex-1 ">
            <DashBoardCard query="low-amount" title="Chemicals Running Low" />
          </div>
        </div>
        <div className="border p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <BsBoxes />
          </div>

          <div className="flex-1">
            <DashBoardCard query="out-of-stock" title="Out of Stock" />
          </div>
        </div>
        <div className="border p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <FaSkullCrossbones />
          </div>

          <div className="flex-1">
            <DashBoardCard query="expired" title="Expired Chemicals" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-2 ">
        <div className=" h-[300px] mt-2 p-3 col-span-2   border  ">
          <ConsumptionAreaChart />
        </div>
        <div className=" h-[300px] col-span-1  mt-2 p-3 border  ">
          <HazardsPieChart />
        </div>
      </div>
      <div className="h-[600px] mt-16 p-3 border flex-grow w-full  ">
        <SupplyBarChart />
      </div>
    </div>
  );
}

export default Dashboard;
