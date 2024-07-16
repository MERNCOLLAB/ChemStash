import { Button, FormHeader, Input } from '../components';
import useChemicalAmountUpdate from '../hooks/chemical/useChemicalAmountUpdate';

const ConsumeChemicalForm = ({ item, getChemicalList, handleDrawerClose }) => {
  const { update, handleAmountChange, handleSubmit } = useChemicalAmountUpdate(item, getChemicalList);

  return (
    <form onSubmit={handleSubmit} className="bg-white0 min-w-[30%] min-h-full p-7">
      <FormHeader title="Consume the Chemical" />

      <div className="max-w-[90%] m-auto">
        <div className="my-4">
          <div className="grid grid-cols-2 gap-1">
            <label>Batch</label>
            <p>{item.batch}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <label>Chemical</label>
            <p>{item.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <label>Lot Number</label>
            <p>{item.lotNumber}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <label>Current Amount</label>
            <p>
              {item.amount} &nbsp; {item.unit}
            </p>
          </div>
        </div>

        <div className="mb-2">
          <Input
            id="consumption"
            validation="Amount must be a number"
            placeholder="Enter Amount"
            type="number"
            label="Enter the consumed amount"
            value={update.amount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      <hr className="bg-gray1 mt-1" />
      <div className="flex justify-end mt-4 gap-2.5 p-2.5">
        <Button type="button" variant="secondary" onClick={handleDrawerClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ConsumeChemicalForm;
