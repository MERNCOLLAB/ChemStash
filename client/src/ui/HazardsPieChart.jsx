import { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import useHazardPieChartData from '../api/dashboard/useHazardPieChartData';

import pieColors from '../helpers/PieColors';
import { renderCustomizedLabel } from '../configs/CustomizePieLabel';

const HazardsPieChart = () => {
  const { loading, error, hazardData, hazardPieChartData } = useHazardPieChartData();

  useEffect(() => {
    hazardPieChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="w-full min-h-[350px] bg-indigo1/50 animate-pulse " />;
  }

  if (error) {
    return <div className="flex justify-center items-center  min-h-[50vh]">Something went wrong, {error.message}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <h1 className="font-semibold text-sm">Chemicals by Hazard Classification</h1>
      <PieChart>
        <Pie
          data={hazardData}
          cx="50%"
          cy="30%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {hazardData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          verticalAlign="left"
          align="right"
          wrapperStyle={{ bottom: 120, right: 20, fontSize: '12px', fontWeight: 'semibold' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HazardsPieChart;
