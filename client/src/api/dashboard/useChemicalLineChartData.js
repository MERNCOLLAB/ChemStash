import { useState } from 'react';

const useLineChartData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lineChartData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/chemical/consume/');
      if (!response.ok) {
        throw new Error('Failed to fetch the consumption data');
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

  return { loading, error, data, lineChartData };
};

export default useLineChartData;
