import CustomSelect from '../components/CustomSelect';
import { Button, Input } from '../components';
import useChemicalForm from '../hooks/chemical/useChemicalForm';
import useAddChemical from '../api/chemical/useAddChemical';

function AddChemicalForm() {
  const { locationOptions, hazardClassificationOptions, formData, handleSubmit, handleChange, handleChangeOption } =
    useChemicalForm();

  const { loading } = useAddChemical();

  return (
    <form onSubmit={handleSubmit} className="menu p-4 w-[49%] min-h-full text-base-content bg-white0">
      <ul>
        <li>
          {/* Chemical Name */}
          <Input
            disable={loading}
            value={formData.name}
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
            disable={loading}
            value={formData.batch}
            id="batch"
            type="number"
            label="Batch Number"
            placeholder="Enter Batch Number"
            onChange={handleChange}
            validation="Please enter a valid batch number (e.g., 1001, 2002)"
          />
        </li>
        <li>
          {/* Molecular Formula */}
          <Input
            disable={loading}
            value={formData.molecularFormula}
            id="molecularFormula"
            label="Molecular Formula"
            placeholder="Enter Molecular Formula"
            onChange={handleChange}
            validation="Please enter the chemical formula (eg. Ba2SO4)"
          />
        </li>
        <li>
          {/* Lot Number */}
          <Input
            disable={loading}
            value={formData.lotNumber}
            id="lotNumber"
            type="number"
            label="Lot Number"
            placeholder="Enter Lot Number"
            onChange={handleChange}
            validation="Please enter a valid lot number (e.g., 001, 002)"
          />
        </li>
        <li>
          {/* Purity */}
          <Input
            label="Purity"
            disable={loading}
            value={formData.purity}
            id="purity"
            type="text"
            placeholder="Enter Purity"
            onChange={handleChange}
            validation="Please enter the purity (eg., Lab Grade, Tech Grade)"
          />
        </li>
        <li>
          {/* Location */}
          <CustomSelect
            label="Storage Location"
            validation="Enter where are you going to store the chemical"
            placeholder="Select a location"
            value={locationOptions.find((opt) => opt.value === formData.location)}
            options={locationOptions}
            onChange={(selectedLocation) => handleChangeOption(selectedLocation, 'location')}
          />
        </li>
        <li>
          {/* Brand */}
          <Input
            label="Brand"
            disable={loading}
            value={formData.brand}
            id="brand"
            type="text"
            placeholder="Enter Brand"
            onChange={handleChange}
            validation="Please enter the chemical brand (eg. Merck, Sigma Aldrich)"
          />
        </li>
        <li>
          {/* Number of Supply */}
          <Input
            label="Supply"
            disable={loading}
            value={formData.supply}
            id="supply"
            type="number"
            placeholder="Enter the Number of Supply"
            onChange={handleChange}
            validation="Please enter the number of bottles or container"
          />
        </li>
        <li>
          {/* Amount */}
          <Input
            label="Amount"
            disable={loading}
            value={formData.amount}
            id="amount"
            type="number"
            placeholder="Enter Amount"
            onChange={handleChange}
            validation="Please enter the amount or quantity of the chemical"
          />
        </li>
        <li>
          {/* Unit */}
          <Input
            label="Expression Unit"
            disable={loading}
            value={formData.unit}
            id="unit"
            type="text"
            placeholder="Enter Unit"
            onChange={handleChange}
            validation="Please enter the unit of expression for the amount(eg. L, grams)"
          />
        </li>
        <li>
          {/* Date Received */}
          <Input
            label="Date Received"
            disable={loading}
            value={formData.dateReceived}
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
            value={formData.expiryDate}
            id="expiryDate"
            type="date"
            onChange={handleChange}
            validation="Enter the chemical expiry date in mm/dd/yy. Greater than date purchased"
          />
        </li>
        <li>
          {/* Hazard Classification */}
          <CustomSelect
            label="Hazard Classification"
            validation="Enter the chemical hazard classification (GHS Standard)"
            placeholder="Select a classification"
            value={hazardClassificationOptions.find((opt) => opt.value === formData.hazardClassification)}
            options={hazardClassificationOptions}
            onChange={(selectedClassification) => handleChangeOption(selectedClassification, 'hazardClassification')}
          />
        </li>
        <li>
          {/* Safety Data Sheet */}
          <Input
            label="Safety Data Sheet"
            disable={loading}
            value={formData.sds}
            id="sds"
            type="text"
            placeholder="SDS Link"
            onChange={handleChange}
            validation="Please enter the safety data sheet URL"
          />
        </li>
        <li>
          {/* Remarks */}
          <Input
            label="Additional Notes"
            disable={loading}
            value={formData.remarks}
            id="remarks"
            type="text"
            placeholder="Enter Remarks"
            onChange={handleChange}
            validation="Optional remarks"
          />
        </li>
      </ul>
      <Button type="submit" variant="primary" disable={loading} className="btn btn-primary mt-4">
        Add Chemical
      </Button>
    </form>
  );
}

export default AddChemicalForm;
