import { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import useHazardPieChartData from '../api/dashboard/useHazardPieChartData';

import pieColors from '../helpers/PieColors';
import { BigSpinner } from '../components';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#F1F5F9" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const HazardsPieChart = () => {
  const { loading, error, hazardData, hazardPieChartData } = useHazardPieChartData();

  useEffect(() => {
    hazardPieChartData();
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
      <h1 className="font-semibold text-sm">Chemicals by Hazard Classification</h1>
      <PieChart>
        <Pie
          data={hazardData}
          cx="50%"
          cy="40%"
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
        <Legend layout="horizontal" verticalAlign="bottom" align="left" wrapperStyle={{ bottom: 60 }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HazardsPieChart;
