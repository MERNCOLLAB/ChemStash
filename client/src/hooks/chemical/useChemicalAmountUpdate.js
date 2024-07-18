import { useState } from 'react';
import { useSelector } from 'react-redux';


const useChemicalAmountUpdate = (item, consumeChemical) => {
  const { currentUser } = useSelector((state) => state.user);
  const [updateAmount, setUpdateAmount] = useState({
    id: item._id,
    amount: '',
    unit: null,
    user: currentUser,
  });

  const handleAmountChange = (event) => {
    setUpdateAmount((prevState) => ({
      ...prevState,
      amount: Number(event.target.value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    consumeChemical(updateAmount);
  };

  return { updateAmount, handleAmountChange,handleSubmit };
};

export default useChemicalAmountUpdate;
