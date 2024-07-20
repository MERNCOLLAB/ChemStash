import { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import useLocationPieChartData from '../api/dashboard/useLocationPieChart';

import pieColors from '../helpers/PieColors';
import { BigSpinner } from '../components';
import { renderCustomizedLabel } from '../configs/CustomizePieLabel';

const LocationPieChart = () => {
  const { loading, error, locData, locationPieChartData } = useLocationPieChartData();

  useEffect(() => {
    locationPieChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center  min-h-[50vh]">
        <BigSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center  min-h-[50vh]">Something went wrong, {error.message}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <h1 className="font-semibold text-sm">Chemicals by Location</h1>
      <PieChart>
        <Pie
          data={locData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {locData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="left"
          wrapperStyle={{ bottom: 20, left: 20, fontSize: '12px', fontWeight: 'semibold' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LocationPieChart;
