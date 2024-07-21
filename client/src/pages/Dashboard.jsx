import { SupplyBarChart, ConsumptionAreaChart, HazardsPieChart, LocationPieChart } from '../ui';
import { FlaskIcon, DropIcon, OutOfStockIcon, ExpiredIcon } from '../icons';
import { DashboardCard } from '../components';

function Dashboard() {
  return (
    <div className="w-full  p-2  mt-2">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-2 ">
        <DashboardCard title="Total Chemicals" icon={<FlaskIcon />} />
        <DashboardCard title="Chemicals Running Low" query="low-amount" icon={<DropIcon />} />
        <DashboardCard title="Out of Stock" query="out-of-stock" icon={<OutOfStockIcon />} />
        <DashboardCard title="Expired Chemicals" query="expired" icon={<ExpiredIcon />} />
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
