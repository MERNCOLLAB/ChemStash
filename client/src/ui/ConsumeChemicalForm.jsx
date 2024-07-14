import { useState } from 'react';
import { Button, Input } from '../components';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const unitOptions = [
  { value: 1, label: 'ml' },
  { value: 2, label: 'kl' },
  { value: 3, label: 'grams' },
];

const ConsumeChemicalForm = ({ item, getChemicalList }) => {
  const { currentUser } = useSelector((state) => state.user);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { id, amount, unit, user } = update;

    try {
      const response = await fetch(`/api/chemical/${id}/consume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, unit, user }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      getChemicalList();

      console.log('Consumption request successful');
    } catch (error) {
      console.error('Error consuming chemical:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white0 min-h-full">
      <Input
        id="consumption"
        validation="Amount must be a number"
        placeholder="Enter Amount"
        type="number"
        label="Enter Amount"
        value={update.amount}
        onChange={handleAmountChange}
      />
      <p>Select Unit</p>
      <Select
        options={unitOptions}
        onChange={handleUnitChange}
        value={unitOptions.find((option) => option.value === update.unit)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ConsumeChemicalForm;
