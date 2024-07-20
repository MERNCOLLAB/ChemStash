import { useState } from 'react';

const useHazardPieChartData = () => {
  const [hazardData, setHazardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hazardPieChartData = async () => {
    try {
      setLoading(true);
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

      setHazardData(formattedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, hazardData, hazardPieChartData };
};

export default useHazardPieChartData;
