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
    <div className="text-sm flex h-full ">
      <ResponsiveContainer>
        <h1 className="font-semibold text-sm">Chemicals by Hazard Classification</h1>
        <PieChart>
          <Pie data={hazardData} labelLine={false} label={renderCustomizedLabel} fill="#8884d8" dataKey="value">
            {hazardData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HazardsPieChart;
