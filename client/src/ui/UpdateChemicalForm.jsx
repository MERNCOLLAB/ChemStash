import { Input, Button, FormHeader, FormSubHeader } from '../components';
import CustomSelect from '../components/CustomSelect';
import useChemicalForm from '../hooks/chemical/useChemicalForm';
import useUpdateChemicalDrawer from '../hooks/chemical/useUpdateChemicalDrawer';

function UpdateChemicalForm({ item, handleUpdate, loading }) {
  const { locationOptions, hazardClassificationOptions } = useChemicalForm();
  const { updatedItem, handleChange, handleChangeOption, onUpdate } = useUpdateChemicalDrawer(item, handleUpdate);

  return (
    <form className="p-7 w-[49%] min-h-full  bg-white0" onSubmit={onUpdate}>
      <FormHeader title="Update Chemical Form" />
      <FormSubHeader title="Basic Info" subtitle="Basic information of the chemical" />

      <ul>
        <li>
          {/* Chemical Name */}
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
        </li>

        <li>
          {/* Batch Number */}
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
        </li>

        {/* Molecular Formula */}
        <li>
          <Input
            disabled={loading}
            value={updatedItem.molecularFormula}
            id="molecularFormula"
            label="Molecular Formula"
            placeholder="Enter Molecular Formula"
            onChange={handleChange}
            validation="Please enter the chemical formula (eg. Ba2SO4)"
          />
        </li>

        <li>
          {/* Lot Number */}
          <label>Lot Number</label>
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
        </li>

        {/* Purity */}
        <li>
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
        </li>

        {/* Location */}
        <li>
          <label>Location</label>
          <CustomSelect
            label="Storage Location"
            validation="Enter where are you going to store the chemical"
            placeholder="Select a location"
            value={locationOptions.find((opt) => opt.value === updatedItem.location)}
            options={locationOptions}
            onChange={(selectedLocation) => handleChangeOption(selectedLocation, 'location')}
          />
        </li>

        {/* Brand */}
        <li>
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
        </li>

        {/* Number of Supply */}
        <li>
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
        </li>

        {/* Amount */}
        <li>
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
        </li>

        {/*  Unit */}
        <li>
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
        </li>

        {/* Date Received */}
        <li>
          <Input
            label="Date Received"
            disable={loading}
            value={updatedItem.dateReceived}
            id="dateReceived"
            type="date"
            onChange={handleChange}
            validation="Enter the date the chemical received in mm/dd/yy"
          />
        </li>
        <li>
          {/* Expiry Date */}
          <Input
            label="Expiry Date"
            disable={loading}
            value={updatedItem.expiryDate}
            id="expiryDate"
            type="date"
            onChange={handleChange}
            validation="Enter the chemical expiry date in mm/dd/yy. Greater than date purchased"
          />
        </li>

        {/* Hazard Classification */}
        <li>
          <label>Hazard Classification</label>
          <CustomSelect
            label="Hazard Classification"
            validation="Enter the chemical hazard classification (GHS Standard)"
            placeholder="Select a classification"
            value={hazardClassificationOptions.find((opt) => opt.value === updatedItem.hazardClassification)}
            options={hazardClassificationOptions}
            onChange={(selectedClassification) => handleChangeOption(selectedClassification, 'hazardClassification')}
          />
        </li>

        {/* Safety Data Sheet */}
        <li>
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
        </li>

        {/* Remarks */}
        <li>
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
        </li>
      </ul>

      <Button type="submit" variant="primary" className="btn btn-primary mt-4">
        Update
      </Button>
    </form>
  );
}

export default UpdateChemicalForm;
