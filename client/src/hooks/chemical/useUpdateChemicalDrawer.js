import { useState, useEffect } from 'react';
import { initialChemicalData } from '../../constants';
import { formatDate } from '../../helpers/FormatDate';

const useUpdateChemicalDrawer = (item, updateChemical) => {
  const [updatedItem, setUpdatedItem] = useState({ ...initialChemicalData, ...item });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };

  const handleChangeOption = (selectedOption, field) => {
    setUpdatedItem({
      ...updatedItem,
      [field]: selectedOption ? selectedOption.value : '',
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    updateChemical(updatedItem);
  };

  useEffect(() => {
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      ...item,
      dateReceived: formatDate(item.dateReceived),
      expiryDate: formatDate(item.expiryDate),
    }));
  }, [item]);

  return { updatedItem, setUpdatedItem, handleChange, handleChangeOption, onUpdate };
};

export default useUpdateChemicalDrawer;
