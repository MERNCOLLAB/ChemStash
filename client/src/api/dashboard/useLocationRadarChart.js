import { useState } from 'react';

const useLocationRadarChartData = () => {
  const [locData, setLocData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locationRadarChartData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chemical/list/location`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error('Failed to fetch the location data');
      }

      const locationCount = result.reduce((acc, item) => {
        acc[item.location] = (acc[item.location] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.keys(locationCount).map((loc) => ({
        name: loc,
        value: locationCount[loc],
      }));

      setLocData(formattedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, locData, locationRadarChartData };
};

export default useLocationRadarChartData;
