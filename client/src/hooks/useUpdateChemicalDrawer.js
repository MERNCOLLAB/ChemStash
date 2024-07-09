import { useState, useEffect } from 'react';
import { initialChemicalData } from '../constants';
import { formatDate } from '../helpers/FormatDate';

const useUpdateChemicalDrawer = (item, handleUpdate) => {
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
    handleUpdate(updatedItem);
  };

  useEffect(() => {
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      ...item,
      purchaseDate: formatDate(item.purchaseDate),
      expiryDate: formatDate(item.expiryDate),
    }));
  }, [item]);

  return { updatedItem, setUpdatedItem, handleChange, handleChangeOption, onUpdate };
};

export default useUpdateChemicalDrawer;
