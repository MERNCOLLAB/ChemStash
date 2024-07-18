import useConsumeChemical from '../api/chemical/useConsumeChemical';
import { Button, FormHeader, Input, ViewChemicalData, ChemicalFormula } from '../components';
import useChemicalAmountUpdate from '../hooks/chemical/useChemicalAmountUpdate';
import ToastProvider from '../configs/ToastProvider';

const ConsumeChemicalForm = ({ item, getChemicalList, handleDrawerClose }) => {
  const {loading, consumeChemical, toastMessage, toastType, clearToast } = useConsumeChemical(getChemicalList);
  const { updateAmount, handleAmountChange, handleSubmit } = useChemicalAmountUpdate(item, consumeChemical);

  return (
    <form onSubmit={handleSubmit} className="bg-white0 min-w-[30%] min-h-full p-7">
      <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast}/> 
      <FormHeader title="Consume the Chemical" />
      <div className="">
        <div className="grid items-center gap-2 my-4">
          {/* Batch Number */}
          <ViewChemicalData gridColsClass="grid-cols-2" label="Batch Number">
            {item.batch}
          </ViewChemicalData>

          {/* Chemical Name */}
          <ViewChemicalData gridColsClass="grid-cols-2" label="Chemical">
            {item.name}
          </ViewChemicalData>

          {/* Molecular Formula */}
          <ViewChemicalData gridColsClass="grid-cols-2" label="Formula">
            <ChemicalFormula formula={item.molecularFormula} />
          </ViewChemicalData>

          {/* Lot Number */}
          <ViewChemicalData gridColsClass="grid-cols-2" label="CAS Registry Number">
            {item.casNumber}
          </ViewChemicalData>

          {/* Current Amount */}
          <ViewChemicalData gridColsClass="grid-cols-2" label="Current Amount">
            {item.amount} &nbsp; {item.unit}
          </ViewChemicalData>
        </div>
        <hr className="bg-gray1 my-5" />
        <div className="mb-2">
          <Input
            id="consumption"
            validation="Amount must be a number"
            placeholder="Enter Amount"
            disabled={loading}
            type="number"
            label="Enter the consumed amount"
            value={updateAmount.amount}
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
