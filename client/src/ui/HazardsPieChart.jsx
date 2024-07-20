import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#a5c4e7', '#70c5bb', '#fdba74', '#f0abfc', '#94a3b8', '#a1a7e4', '#fb7185'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const HazardsPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/chemical/list/hazardClassification');
        const result = await response.json();

        const hazardCount = result.reduce((acc, item) => {
          acc[item.hazardClassification] = (acc[item.hazardClassification] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(hazardCount).map((hazard) => ({
          name: hazard,
          value: hazardCount[hazard],
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="40%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="horizontal" verticalAlign="bottom" align="left" wrapperStyle={{ bottom: 60 }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HazardsPieChart;
