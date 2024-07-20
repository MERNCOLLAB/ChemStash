import { useState } from 'react';
import { useSelector } from 'react-redux';

const useChemicalAmountUpdate = (item, consumeChemical) => {
  const { currentUser } = useSelector((state) => state.user);
  const [updateAmount, setUpdateAmount] = useState({
    id: item._id,
    updatedSupply: item.updatedSupply,
    consumptionAmount: null,
    unit: item.unit,
    user: currentUser,
  });

  const handleAmountChange = (event) => {
    const consumptionAmount = Number(event.target.value);
    setUpdateAmount((prevState) => ({
      ...prevState,
      consumptionAmount,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    consumeChemical(updateAmount);
  };

  return { updateAmount, handleAmountChange, handleSubmit };
};

export default useChemicalAmountUpdate;
