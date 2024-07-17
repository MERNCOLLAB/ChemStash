import { RiBox1Line } from 'react-icons/ri';
import { BsBoxes } from 'react-icons/bs';
import { PiCodesandboxLogoLight } from 'react-icons/pi';
import { LuBox } from 'react-icons/lu';

import { DashBoardCard } from '../ui';
import SampleAreaChart from '../ui/SampleLineChart';
import SampleBarChart from '../ui/SampleBarChart';

function Dashboard() {
  return (
    <div className="w-full border p-2 h-[calc(100vh-66px)] mt-2">
      <div className="flex flex-wrap justify-between gap-2 ">
        <div className="border p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <BsBoxes />
          </div>

          <div className="flex-1">
            <DashBoardCard title="Total Chemicals" />
          </div>
        </div>

        <div className="border p-3 flex items-center gap-2 flex-grow ">
          <div className="text-4xl">
            <RiBox1Line />
          </div>

          <div className="flex-1 ">
            <DashBoardCard query="low-amount" title="Chemicals Running Low" />
          </div>
        </div>
        <div className="border p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <LuBox />
          </div>

          <div className="flex-1">
            <DashBoardCard query="out-of-stock" title="Out of Stock" />
          </div>
        </div>
        <div className="border p-3 flex items-center gap-2  flex-grow">
          <div className="text-4xl">
            <PiCodesandboxLogoLight />
          </div>

          <div className="flex-1">
            <DashBoardCard query="expired" title="Expired Chemicals" />
          </div>
        </div>
      </div>
      <div className="flex flex-col   gap-40">
        <div className=" h-[300px] mt-2 p-3 border col-span-4  ">
          <SampleAreaChart />
        </div>

        {/* <div className=" h-[300px] mt-2 p-3 border flex-grow  col-span-4">
          <SamplePieChart />
        </div>
        <div className=" h-[300px] mt-2 p-3 border  col-span-4 ">
          <SampleRadarChart />
        </div> */}

        <div className=" h-[600px] mt-2 p-3 border flex-grow w-full  ">
          <SampleBarChart />
          {/* <Bar dataKey="supply" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
