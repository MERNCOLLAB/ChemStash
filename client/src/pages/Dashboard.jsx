import { SupplyBarChart, ConsumptionAreaChart, HazardsPieChart, LocationRadarChart } from '../ui';
import { FlaskIcon, DropIcon, OutOfStockIcon, ExpiredIcon, ExpiredChemical } from '../icons';
import { DashboardCard } from '../components';

function Dashboard() {
  return (
    <div className="w-full p-2">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-between gap-2 ">
        <DashboardCard bg="bg-sky-500" title="Total Chemicals" icon={<FlaskIcon />} />
        <DashboardCard bg="bg-slate-500" title="Chemicals Running Low" query="low-amount" icon={<DropIcon />} />
        <DashboardCard bg="bg-slate-700" title="Out of Stock" query="out-of-stock" icon={<OutOfStockIcon />} />
        <DashboardCard bg="bg-blue1" title="Chemicals Near Expiry" query="near-expired" icon={<ExpiredIcon />} />
        <DashboardCard bg="bg-neutral-500" title="Expired Chemicals" query="expired" icon={<ExpiredChemical />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-2   mt-2">
        <div className="md:h-[350px] p-3 col-span-2  border  shadow-md rounded-md ">
          <ConsumptionAreaChart />
        </div>
        <div className="md:h-[350px] min-h-auto col-span-1  p-3 border shadow-md  rounded-md ">
          <HazardsPieChart />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-2  mt-2">
        <div className=" h-[350px] p-3 col-span-2  border  shadow-md rounded-md">
          <SupplyBarChart />
        </div>
        <div className="md:h-[350px] min-h-auto col-span-1 flex p-3 border shadow-md rounded-md">
          <LocationRadarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
