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
  const [error, setError] = useState(null);

  const handleAmountChange = (event) => {
    const consumptionAmount = Number(event.target.value);
    setUpdateAmount((prevState) => ({
      ...prevState,
      consumptionAmount,
    }));

    if (consumptionAmount > item.amount) {
      setError('Consumption amount exceeds available chemical amount.');
    } else if (consumptionAmount <= 0) {
      setError('Consumption amount must be greater than 0.');
    } else {
      setError(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error && updateAmount.consumptionAmount > 0) {
      consumeChemical(updateAmount);
    }
  };

  return { updateAmount, handleAmountChange, handleSubmit, error };
};

export default useChemicalAmountUpdate;
