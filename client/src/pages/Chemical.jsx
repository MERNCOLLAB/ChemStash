import { useState } from 'react';
import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';
import { Button, Input, FormulaInput } from '../components';
import { location, hazardClassifications, initialChemicals, chemicalStatus } from '../constants';
import { transformArrayToOptions } from '../helpers/transformArray';

function Chemical() {
  const locationOptions = transformArrayToOptions(location);
  const hazardClassificationOptions = transformArrayToOptions(hazardClassifications);
  const chemicalStatusOptions = transformArrayToOptions(chemicalStatus);

  const [formData, setFormData] = useState(initialChemicals);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      [id]: type === 'number' ? Number(value) : value,
    });
  };

  const handleChangeOption = (selectedOption, field) => {
    setFormData({
      ...formData,
      [field]: selectedOption ? selectedOption.value : '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/chemical/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return;
      }
      setFormData(initialChemicals);
      alert('Chemical successfully created');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  console.log(formData.molecularFormula);
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
          placeholder="Supply"
          onChange={handleChange}
        />

        {/* Unit */}
        <Input
          disable={loading}
          value={formData.unit}
          id="unit"
          type="text"
          placeholder="Unit (eg. Bottle)"
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

        {/* Chemical Status */}
        <Select
          placeholder="Status"
          value={chemicalStatusOptions.find((opt) => opt.value === formData.status)}
          options={chemicalStatusOptions}
          onChange={(selectedStatus) => handleChangeOption(selectedStatus, 'status')}
          styles={selectStyle}
          isClearable
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
