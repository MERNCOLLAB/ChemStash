import { useState } from 'react';
import moment from 'moment';

const useBarChartData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const barChartData = async () => {
    try {
      setLoading(true);
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
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, barChartData };
};

export default useBarChartData;
