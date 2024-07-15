import { Input, Button, FormHeader, FormSubHeader, FormContainer } from '../components';
import CustomSelect from '../components/CustomSelect';
import useChemicalForm from '../hooks/chemical/useChemicalForm';
import useDrawer from '../hooks/chemical/useDrawer';
import useUpdateChemicalDrawer from '../hooks/chemical/useUpdateChemicalDrawer';

function UpdateChemicalForm({ item, handleUpdate, loading }) {
  const { locationOptions, hazardClassificationOptions } = useChemicalForm();
  const { updatedItem, handleChange, handleChangeOption, onUpdate } = useUpdateChemicalDrawer(item, handleUpdate);
  const { handleDrawerClose } = useDrawer();
  // Basic Information Section
  // First Row: Chemical Name, Molecular Formula, Brand
  const basicInfoFirstRow = (
    <>
      <Input
        disabled={loading}
        value={updatedItem.name}
        id="name"
        type="text"
        label="Chemical Name"
        placeholder="Enter chemical name"
        onChange={handleChange}
        validation="General compound name"
      />
      <Input
        disabled={loading}
        value={updatedItem.molecularFormula}
        id="molecularFormula"
        label="Molecular Formula"
        placeholder="Enter Molecular Formula"
        onChange={handleChange}
        validation="Please enter the chemical formula (eg. Ba2SO4)"
      />
      <Input
        label="Brand"
        disable={loading}
        value={updatedItem.brand}
        id="brand"
        type="text"
        placeholder="Enter Brand"
        onChange={handleChange}
        validation="Please enter the chemical brand (eg. Merck, Sigma Aldrich)"
      />
    </>
  );

  // Second Row: Purity, Batch Number, Lot Number
  const basicInfoSecondRow = (
    <>
      <Input
        label="Purity"
        disable={loading}
        value={updatedItem.purity}
        id="purity"
        type="text"
        placeholder="Enter Purity"
        onChange={handleChange}
        validation="Please enter the purity (eg., Lab Grade, Tech Grade)"
      />
      <Input
        disabled={loading}
        value={updatedItem.batch}
        id="batch"
        type="number"
        label="Batch Number"
        placeholder="Enter Batch Number"
        onChange={handleChange}
        validation="Please enter a valid batch number (e.g., 1001, 2002)"
      />
      <Input
        disabled={loading}
        value={updatedItem.lotNumber}
        id="lotNumber"
        type="number"
        label="Lot Number"
        placeholder="Enter Lot Number"
        onChange={handleChange}
        validation="Please enter a valid lot number (e.g., 001, 002)"
      />
    </>
  );

  // Storage Information Section
  // First Row: Location, Date Received, Expiry Date
  const storageInfoFirstRow = (
    <>
      <CustomSelect
        label="Storage Location"
        validation="Enter where are you going to store the chemical"
        placeholder="Select a location"
        value={locationOptions.find((opt) => opt.value === updatedItem.location)}
        options={locationOptions}
        onChange={(selectedLocation) => handleChangeOption(selectedLocation, 'location')}
      />
      <Input
        label="Date Received"
        disable={loading}
        value={updatedItem.dateReceived}
        id="dateReceived"
        type="date"
        onChange={handleChange}
        validation="Enter the date the chemical received in mm/dd/yy"
      />
      <Input
        label="Expiry Date"
        disable={loading}
        value={updatedItem.expiryDate}
        id="expiryDate"
        type="date"
        onChange={handleChange}
        validation="Enter the chemical expiry date in mm/dd/yy. Greater than date purchased"
      />
    </>
  );

  // Second Row: Supply, Amount, Unit
  const storageInfoSecondRow = (
    <>
      <Input
        label="Supply"
        disable={loading}
        value={updatedItem.supply}
        id="supply"
        type="number"
        placeholder="Enter the Number of Supply"
        onChange={handleChange}
        validation="Please enter the number of bottles or container"
      />
      <Input
        label="Amount"
        disable={loading}
        value={updatedItem.amount}
        id="amount"
        type="number"
        placeholder="Enter Amount"
        onChange={handleChange}
        validation="Please enter the amount or quantity of the chemical"
      />

      <Input
        label="Expression Unit"
        disable={loading}
        value={updatedItem.unit}
        id="unit"
        type="text"
        placeholder="Enter Unit"
        onChange={handleChange}
        validation="Please enter the unit of expression for the amount(eg. L, grams)"
      />
    </>
  );

  // Safety Information Section
  // First Row: Hazard Classification, Safety Data Sheet, Remarks
  const safetyInfoRow = (
    <>
      <CustomSelect
        label="Hazard Classification"
        validation="Enter the chemical hazard classification (GHS Standard)"
        placeholder="Select a classification"
        value={hazardClassificationOptions.find((opt) => opt.value === updatedItem.hazardClassification)}
        options={hazardClassificationOptions}
        onChange={(selectedClassification) => handleChangeOption(selectedClassification, 'hazardClassification')}
      />
      <Input
        label="Safety Data Sheet"
        disable={loading}
        value={updatedItem.sds}
        id="sds"
        type="text"
        placeholder="SDS Link"
        onChange={handleChange}
        validation="Please enter the safety data sheet URL"
      />
      <Input
        label="Additional Notes"
        disable={loading}
        value={updatedItem.remarks}
        id="remarks"
        type="text"
        placeholder="Enter Remarks"
        onChange={handleChange}
        validation="Optional remarks"
      />
    </>
  );

  return (
    <form className="p-7 min-w-[49%]  min-h-full  bg-white0" onSubmit={onUpdate}>
      <FormHeader title="Update Chemical Form" />
      {/* Basic Info */}
      <FormSubHeader title="Basic Info" subtitle="Basic information of the chemical" />
      <FormContainer firstRowInput={basicInfoFirstRow} secondRowInput={basicInfoSecondRow} />

      {/* Storage Info */}
      <FormSubHeader title="Storage Info" subtitle="Details about the storage and quantity of the chemical" />
      <FormContainer firstRowInput={storageInfoFirstRow} secondRowInput={storageInfoSecondRow} />

      {/* Safety Info */}
      <FormSubHeader title="Safety Info" subtitle="Hazard classification and reference safety data sheet" />
      <FormContainer firstRowInput={safetyInfoRow} />

      <div className="">
        <div className="flex justify-end mt-4 gap-2.5 p-2.5">
          <Button type="button" variant="secondary" onClick={handleDrawerClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateChemicalForm;
