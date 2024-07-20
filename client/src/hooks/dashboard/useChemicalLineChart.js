import { useState, useEffect } from 'react';
import moment from 'moment';

const useChemicalLineChart = (data, lineChartData) => {
  const [selectedChemical, setSelectedChemical] = useState('');

  useEffect(() => {
    lineChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chemicalOptions = [
    { value: '', label: 'All' },
    ...Array.from(new Set(data.map((item) => item.chemicalName))).map((chemical) => ({
      value: chemical,
      label: chemical,
    })),
  ];

  const tickFormatter = (tick) => {
    return moment(tick).format('MMM YYYY');
  };

  const handleChangeChemical = (selectedOption) => {
    if (selectedOption === null) return;

    setSelectedChemical(selectedOption.value);
  };

  let filteredData = data;
  if (selectedChemical !== '') {
    filteredData = data.filter((item) => item.chemicalName === selectedChemical);
  }
  return { selectedChemical, chemicalOptions, filteredData, tickFormatter, handleChangeChemical };
};

export default useChemicalLineChart;
