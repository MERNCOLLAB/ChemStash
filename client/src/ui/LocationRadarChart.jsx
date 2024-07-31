import { useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import useLocationRadarChartData from '../api/dashboard/useLocationRadarChart';

const LocationRadarChart = () => {
  const { loading, error, locData, locationRadarChartData } = useLocationRadarChartData();

  useEffect(() => {
    locationRadarChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="w-full min-h-[300px] bg-indigo1/50 animate-pulse " />;
  }

  if (error) {
    return <div className="flex justify-center items-center  min-h-[50vh]">Something went wrong, {error.message}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <h1 className="font-semibold text-sm">Chemicals by Location</h1>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={locData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis />
        <Radar name="Locations" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend layout="horizontal" verticalAlign="bottom" align="left" wrapperStyle={{ bottom: 20, left: 20, fontSize: '12px', fontWeight: 'semibold' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default LocationRadarChart;
