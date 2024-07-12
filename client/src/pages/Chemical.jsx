import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';
import { Button, Input, FormulaInput } from '../components';
import useChemicalForm from '../hooks/useChemicalForm';
import useAddChemical from '../api/useAddChemical';

function Chemical() {
  const { locationOptions, hazardClassificationOptions, formData, handleSubmit, handleChange, handleChangeOption } =
    useChemicalForm();

  const { loading, error } = useAddChemical();

  return (
    <div className="p-3 max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col">
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

        {/* Molecular Formula */}
        <div className="flex items-center gap-2">
          <label className="flex-1 text-center">Molecular Formula</label>
          <FormulaInput
            id="molecularFormula"
            value={formData.molecularFormula}
            onChange={(value) => handleChange({ target: { id: 'molecularFormula', value } })}
          />
        </div>

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

        {/* Location */}
        <Select
          placeholder="Select a location"
          value={locationOptions.find((opt) => opt.value === formData.location)}
          options={locationOptions}
          onChange={(selectedLocation) => handleChangeOption(selectedLocation, 'location')}
          styles={selectStyle}
          isClearable
        />

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

        {/* Unit */}
        <Input
          label="Amount Unit"
          disable={loading}
          value={formData.unit}
          id="unit"
          type="text"
          placeholder="Enter Unit"
          onChange={handleChange}
          validation="Please enter the expression unit of the amount(eg. L, grams)"
        />

        {/* Purchase Date */}
        <Input
          label="Date Received"
          disable={loading}
          value={formData.purchaseDate}
          id="purchaseDate"
          type="date"
          onChange={handleChange}
          validation="Enter the date the chemical received in mm/dd/yy"
        />

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

        {/* Hazard Classification */}
        <Select
          placeholder="Select a Hazard Classification"
          value={hazardClassificationOptions.find((opt) => opt.value === formData.hazardClassification)}
          options={hazardClassificationOptions}
          onChange={(selectedClassification) => handleChangeOption(selectedClassification, 'hazardClassification')}
          styles={selectStyle}
          isClearable
        />

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
        <div className="flex justify-between">
          <span></span>
          <Button type="submit" variant="form" disable={loading}>
            Add Chemical
          </Button>
        </div>
      </form>
      {error && <div className="text-red-500">There was an error processing your request.</div>}
    </div>
  );
}

export default Chemical;
