import { useState } from 'react';
import { location, hazardClassifications, initialChemicalData } from '../../constants';
import { transformArrayToOptions } from '../../helpers/transformArray';
import useAddChemical from '../../api/chemical/useAddChemical';

const useChemicalForm = () => {
  const { addChemical } = useAddChemical();
  // Select Element Options
  const locationOptions = transformArrayToOptions(location);
  const hazardClassificationOptions = transformArrayToOptions(hazardClassifications);

  // Chemical Form Fields
  const [formData, setFormData] = useState(initialChemicalData);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(formData);
    await addChemical(formData);
  };

  return {
    locationOptions,
    hazardClassificationOptions,
    formData,
    handleChange,
    handleChangeOption,
    handleSubmit,
  };
};

export default useChemicalForm;
