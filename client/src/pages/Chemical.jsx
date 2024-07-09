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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Chemical Name */}
        <Input
          disable={loading}
          value={formData.name}
          id="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />

        {/* Batch Number */}
        <Input
          disable={loading}
          value={formData.batch}
          id="batch"
          type="number"
          placeholder="Batch Number"
          onChange={handleChange}
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
          placeholder="Lot Number"
          onChange={handleChange}
        />

        {/* Purity */}
        <Input
          disable={loading}
          value={formData.purity}
          id="purity"
          type="text"
          placeholder="Purity"
          onChange={handleChange}
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
          disable={loading}
          value={formData.brand}
          id="brand"
          type="text"
          placeholder="Brand"
          onChange={handleChange}
        />

        {/* Number of Supply */}
        <Input
          disable={loading}
          value={formData.supply}
          id="supply"
          type="number"
          placeholder="Supply (in Bottles)"
          onChange={handleChange}
        />

        {/* Amount */}
        <Input
          disable={loading}
          value={formData.amount}
          id="amount"
          type="number"
          placeholder="Amount"
          onChange={handleChange}
        />

        {/* Unit */}
        <Input
          disable={loading}
          value={formData.unit}
          id="unit"
          type="text"
          placeholder="Unit (eg. L, grams)"
          onChange={handleChange}
        />

        {/* Purchase Date */}
        <div className="flex items-center gap-2">
          <label className="flex-2">Date of Purchase: </label>
          <Input
            disable={loading}
            value={formData.purchaseDate}
            id="purchaseDate"
            type="date"
            onChange={handleChange}
          />
        </div>

        {/* Expiry Date */}
        <div className="flex items-center gap-2">
          <label className="flex-2">Expiry Date: </label>
          <Input disable={loading} value={formData.expiryDate} id="expiryDate" type="date" onChange={handleChange} />
        </div>

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
          disable={loading}
          value={formData.sds}
          id="sds"
          type="text"
          placeholder="Safety Data Sheet URL"
          onChange={handleChange}
        />

        {/* Remarks */}
        <Input
          disable={loading}
          value={formData.remarks}
          id="remarks"
          type="text"
          placeholder="Remarks"
          onChange={handleChange}
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
