import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import useLineChartData from '../api/dashboard/useChemicalLineChartData';
import useChemicalLineChart from '../hooks/dashboard/useChemicalLineChart';

import CustomSelect from '../components/CustomSelect';

const ConsumptionAreaChart = () => {
  const { loading, error, data, lineChartData } = useLineChartData();
  const { selectedChemical, chemicalOptions, filteredData, tickFormatter, handleChangeChemical } = useChemicalLineChart(
    data,
    lineChartData
  );

  if (loading) {
    return <div className="w-full min-h-[350px] bg-indigo1/50 animate-pulse " />;
  }

  if (error) {
    return <div className="flex justify-center items-center  min-h-[50vh]">Something went wrong, {error.message}</div>;
  }

  return (
    <div>
      <CustomSelect
        label="Chemical Consumption over Time"
        validation="Select a Chemical"
        placeholder="Select a Chemical"
        value={chemicalOptions.find((option) => option.value === selectedChemical)}
        options={chemicalOptions}
        onChange={handleChangeChemical}
      />

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart width={730} height={250} data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient> */}
          </defs>
          <XAxis dataKey="date" tickFormatter={tickFormatter} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="consumptionAmount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, chemicalName, consumptionAmount, unit } = payload[0].payload;
    return (
      <div className=" p-1 backdrop-sepia-0 bg-slate-100/40  rounded-md flex flex-col gap-1">
        <div>{`Date: ${moment(date).format('MMM YYYY')}`}</div>
        <div>{`Chemical Name: ${chemicalName}`}</div>
        <div>{`Amount: ${consumptionAmount} ${unit}`}</div>
      </div>
    );
  }

  return null;
};

export default ConsumptionAreaChart;
