import { 
  BarChart, 
  Rectangle, 
  Bar, 
  XAxis,
  YAxis,
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer } from 'recharts';
import CustomSelect from '../components/CustomSelect';
import useBarChartData from '../api/dashboard/useChemicalBarChart';
import useChemicalBarChart from '../hooks/dashboard/useChemicalBarChart';
import { BigSpinner } from '../components';

const SampleBarChart = () => {
  const {loading,error, data, barChartData} = useBarChartData();
  const {selectedChemical, chemicalOptions, filteredData, handleChangeChemical} = useChemicalBarChart(data, barChartData)


  
  if (loading) {
    return (<div className="flex justify-center items-center  min-h-[50vh]">
    <BigSpinner />
  </div>);
  }

  if (error) {
    return <div className="flex justify-center items-center  min-h-[50vh]">
      Something went wrong, {error.message}</div>;
  }

  return (
    <div>
      <CustomSelect
        label="Chemical Amount and Supply"
        validation="Select a Chemical"
        placeholder="Select a Chemical"
        value={chemicalOptions.find((option) => option.value === selectedChemical)}
        options={chemicalOptions}
        onChange={handleChangeChemical}
      />

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
          type='category'
          dataKey="name"
          />
          <YAxis/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" activeShape={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="supply" fill="#82ca9d" activeShape={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, dateReceived, amount, supply, unit} = payload[0].payload;
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

export default SampleBarChart;
