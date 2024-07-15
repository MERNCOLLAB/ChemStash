import { useState } from 'react';
import { useSelector } from 'react-redux';
import useConsumeChemical from '../../api/chemical/useConsumeChemical';

const useChemicalAmountUpdate = (item, getChemicalList) => {
  const { currentUser } = useSelector((state) => state.user);
  const { consumeChemical } = useConsumeChemical();

  const [update, setUpdate] = useState({
    id: item,
    amount: '',
    unit: null,
    user: currentUser,
  });

  const handleAmountChange = (event) => {
    setUpdate((prevState) => ({
      ...prevState,
      amount: Number(event.target.value),
    }));
  };

  const handleUnitChange = (selectedOption) => {
    setUpdate((prevState) => ({
      ...prevState,
      unit: selectedOption ? selectedOption.value : null,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    consumeChemical(update, getChemicalList);
  };

  return { update, handleAmountChange, handleUnitChange, handleSubmit };
};

export default useChemicalAmountUpdate;
