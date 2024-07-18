import { useState, useEffect } from "react"

const useChemicalBarChart = (data,barChartData) => {
    const [selectedChemical, setSelectedChemical] = useState('');

    useEffect(() => {
        barChartData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      const chemicalOptions = [
        { value: '', label: 'All' },
        ...Array.from(new Set(data.map((item) => item.name))).map((chemical) => ({
          value: chemical,
          label: chemical,
        })),
      ];
    
      const handleChangeChemical = (selectedOption) => {
        if (selectedOption === null) return;
    
        setSelectedChemical(selectedOption.value);
      };
    
      const filteredData = selectedChemical === '' ? data : data.filter((item) => item.name === selectedChemical);
    return {selectedChemical, chemicalOptions, filteredData, handleChangeChemical}
}

export default useChemicalBarChart
