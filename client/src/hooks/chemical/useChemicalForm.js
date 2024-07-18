import { useState } from 'react';
import { location, hazardClassifications, initialChemicalData } from '../../constants';
import { transformArrayToOptions } from '../../helpers/transformArray';


const useChemicalForm = (addChemical) => {
  // Select Element Options
  const locationOptions = transformArrayToOptions(location);
  const hazardClassificationOptions = transformArrayToOptions(hazardClassifications);

  // Chemical Form Fields
  const [chemicalData, setChemicalData] = useState(initialChemicalData);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setChemicalData({
      ...chemicalData,
      [e.target.id]: e.target.value,
      [id]: type === 'number' ? Number(value) : value,
    });
  };

  const handleChangeOption = (selectedOption, field) => {
    setChemicalData({
      ...chemicalData,
      [field]: selectedOption ? selectedOption.value : '',
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setChemicalData(chemicalData);
    await addChemical(chemicalData);
  };

  return {
    locationOptions,
    hazardClassificationOptions,
    chemicalData,
    handleChange,
    handleChangeOption,
    handleAdd,
  };
};

export default useChemicalForm;
