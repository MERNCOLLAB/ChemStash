import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import CustomSelect from '../components/CustomSelect';

const SampleLineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState('');

  useEffect(() => {
    getAllConsumptionList();
  }, []);

  const chemicalOptions = [
    { value: '', label: 'All' },
    ...Array.from(new Set(data.map((item) => item.chemicalName))).map((chemical) => ({
      value: chemical,
      label: chemical,
    })),
  ];

  const tickFormatter = (tick) => {
    return moment(tick).format('MMM YYYY');
  };

  const handleChangeChemical = (selectedOption) => {
    if (selectedOption === null) return;

    setSelectedChemical(selectedOption.value);
  };

  let filteredData = data;
  if (selectedChemical !== '') {
    filteredData = data.filter((item) => item.chemicalName === selectedChemical);
  }

  const getAllConsumptionList = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/chemical/consume/');
      if (!response.ok) {
        throw new Error('Failed to fetch consumption');
      }

      const responseData = await response.json();
      const transformedData = responseData.data.map((item) => ({
        ...item,
        chemicalName: item.chemicalId.name,
      }));

      setData(transformedData);
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
          <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, chemicalName, amount } = payload[0].payload;
    return (
      <div className=" p-1 backdrop-sepia-0 bg-slate-100/40  rounded-md flex flex-col gap-1">
        <div>{`Date: ${moment(date).format('MMM YYYY')}`}</div>
        <div>{`Chemical Name: ${chemicalName}`}</div>
        <div>{`Amount: ${amount}`}</div>
      </div>
    );
  }

  return null;
};

export default SampleLineChart;
