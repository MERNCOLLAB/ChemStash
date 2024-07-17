import { useState, useEffect } from 'react';
import { BarChart, Rectangle, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import CustomSelect from '../components/CustomSelect';

const SampleBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState('');

  useEffect(() => {
    fetchChemicalList();
  }, []);

  const chemicalOptions = [
    { value: '', label: 'All' },
    ...Array.from(new Set(data.map((item) => item.name))).map((chemical) => ({
      value: chemical,
      label: chemical,
    })),
  ];

  const handleChangeChemical = (selectedOption) => {
    if (selectedOption === null) return;

    setSelectedChemical(selectedOption.value);
  };

  let filteredData = data;
  if (selectedChemical !== '') {
    filteredData = data.filter((item) => item.name === selectedChemical);
  }

  const fetchChemicalList = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/chemical/list/barchart');
      if (!response.ok) {
        throw new Error('Failed to fetch chemical list');
      }

      const result = await response.json();
      const formattedData = result.map((item) => ({
        ...item,
        dateReceived: moment(item.dateReceived).format('YYYY-MM-DD'),
        supply: item.supply * 1000,
      }));

      setData(formattedData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <div>
      <CustomSelect
        label="Chemical"
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
          <XAxis />
          <YAxis />
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
    const { name, dateReceived, amount, supply } = payload[0].payload;
    return (
      <div className="custom-tooltip p-1 backdrop-sepia-0 bg-slate-100/40  rounded-md flex flex-col gap-1">
        <div>{`Name: ${name}`}</div>
        <div>{`Date Received: ${dateReceived}`}</div>
        <div>{`Amount: ${amount}`}</div>
        <div>{`Supply: ${supply}`}</div>
      </div>
    );
  }

  return null;
};

export default SampleBarChart;
