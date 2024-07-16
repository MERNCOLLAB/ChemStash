import { Button, FormHeader, Input, ViewChemicalData, ChemicalFormula } from '../components';
import useChemicalAmountUpdate from '../hooks/chemical/useChemicalAmountUpdate';

const ConsumeChemicalForm = ({ item, getChemicalList, handleDrawerClose }) => {
  const { update, handleAmountChange, handleSubmit } = useChemicalAmountUpdate(item, getChemicalList);

  return (
    <form onSubmit={handleSubmit} className="bg-white0 min-w-[30%] min-h-full p-7">
      <FormHeader title="Consume the Chemical" />
      <div className="">
        <div className="grid items-center gap-2 my-4">
          <ViewChemicalData label="Batch Number">{item.batch}</ViewChemicalData>
          <ViewChemicalData label="Chemical">{item.name}</ViewChemicalData>
          <ViewChemicalData label="Formula">
            <ChemicalFormula formula={item.molecularFormula} />
          </ViewChemicalData>

          <ViewChemicalData label="Lot Number">{item.lotNumber}</ViewChemicalData>

          <ViewChemicalData label="Current Amount">
            {item.amount} &nbsp; {item.unit}
          </ViewChemicalData>
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
