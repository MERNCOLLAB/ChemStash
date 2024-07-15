import { Button, Input } from '../components';
import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';
import useChemicalAmountUpdate from '../hooks/chemical/useChemicalAmountUpdate';

const unitOptions = [
  { value: 1, label: 'ml' },
  { value: 2, label: 'kg' },
  { value: 3, label: 'grams' },
];

const ConsumeChemicalForm = ({ item, getChemicalList }) => {
  const { update, handleAmountChange, handleUnitChange, handleSubmit } = useChemicalAmountUpdate(item, getChemicalList);

  return (
    <form onSubmit={handleSubmit} className="bg-white0 min-w-[49%] min-h-full">
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
        className="w-[310px] mb-1"
        styles={selectStyle}
        options={unitOptions}
        onChange={handleUnitChange}
        value={unitOptions.find((option) => option.value === update.unit)}
      />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ConsumeChemicalForm;
