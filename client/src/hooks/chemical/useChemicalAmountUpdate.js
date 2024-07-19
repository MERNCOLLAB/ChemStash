import { useState } from 'react';
import { useSelector } from 'react-redux';


const useChemicalAmountUpdate = (item, consumeChemical) => {
  const { currentUser } = useSelector((state) => state.user);
  const amount = Number(item.supply*item.amount);
  const [updateAmount, setUpdateAmount] = useState({
    id: item._id,
    supply:item.supply,
    totalAmount:amount,
    consumptionAmount: null,
    unit: null,
    user: currentUser,
  });

  const handleAmountChange = (event) => {
    setUpdateAmount((prevState) => ({
      ...prevState,
      consumptionAmount: Number(event.target.value),
      unit:item.unit,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    consumeChemical(updateAmount);
  };

  return { updateAmount, handleAmountChange,handleSubmit };
};

export default useChemicalAmountUpdate;
