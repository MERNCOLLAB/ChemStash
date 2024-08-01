import { BarChart, Rectangle, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import useBarChartData from '../api/dashboard/useChemicalBarChartData';
import useChemicalBarChart from '../hooks/dashboard/useChemicalBarChart';

import CustomSelect from '../components/CustomSelect';

const SupplyBarChart = () => {
  const { loading, error, data, barChartData } = useBarChartData();
  const { selectedChemical, chemicalOptions, filteredData, handleChangeChemical } = useChemicalBarChart(
    data,
    barChartData
  );

  if (loading) {
    return <div className="w-full min-h-[300px] bg-indigo1/50 animate-pulse " />;
  }

  if (error) {
    return <div className="flex justify-center items-center  min-h-[50vh]">Something went wrong, {error.message}</div>;
  }

  return (
    <div className="text-sm h-full flex justify-center flex-col">
      <CustomSelect
        label="Chemical Amount and Supply"
        validation="Select a Chemical"
        placeholder="Select a Chemical"
        value={chemicalOptions.find((option) => option.value === selectedChemical)}
        options={chemicalOptions}
        onChange={handleChangeChemical}
      />

      <ResponsiveContainer width="100%">
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="amount" fill="#22d3ee" activeShape={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="supply" fill="#64748b" activeShape={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, dateReceived, amount, supply, unit } = payload[0].payload;
    return (
      <div className="custom-tooltip p-1 backdrop-sepia-0 bg-slate-100/40  rounded-md flex flex-col gap-1">
        <div>{`Name: ${name}`}</div>
        <div>{`Date Received: ${dateReceived}`}</div>
        <div>{`Amount per Supply: ${amount} ${unit}`}</div>
        <div>{`Total Supply: ${supply}`}</div>
      </div>
    );
  }

  return null;
};

export default SupplyBarChart;
