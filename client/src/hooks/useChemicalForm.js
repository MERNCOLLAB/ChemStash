import { useState } from 'react';
import { location, hazardClassifications, initialChemicals, chemicalStatus } from '../constants';
import { transformArrayToOptions } from '../helpers/transformArray';

const useChemicalForm = () => {
  // Select Element Options
  const locationOptions = transformArrayToOptions(location);
  const hazardClassificationOptions = transformArrayToOptions(hazardClassifications);
  const chemicalStatusOptions = transformArrayToOptions(chemicalStatus);

  // Chemical Form Fields
  const [formData, setFormData] = useState(initialChemicals);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      [id]: type === 'number' ? Number(value) : value,
    });
  };

  const handleChangeOption = (selectedOption, field) => {
    setFormData({
      ...formData,
      [field]: selectedOption ? selectedOption.value : '',
    });
  };

  return {
    locationOptions,
    hazardClassificationOptions,
    chemicalStatusOptions,
    formData,
    setFormData,
    handleChange,
    handleChangeOption,
  };
};

export default useChemicalForm;
