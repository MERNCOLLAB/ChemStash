import { useState } from 'react';
import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';
import { Button, Input } from '../components';
import { location, hazardClassifications } from '../constants';
import { transformArrayToOptions } from '../helpers/transformArray';
import { chemicalFormInitialValue } from '../constants/chemicals';

function Chemical() {
  const locationOptions = transformArrayToOptions(location);
  const hazardClassificationOptions = transformArrayToOptions(hazardClassifications);
  const [formData, setFormData] = useState(chemicalFormInitialValue);

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
      setFormData(chemicalFormInitialValue);
      alert('Chemical successfully created');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="p-3 max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          disable={loading}
          value={formData.name}
          id="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.lotNumber}
          id="lotNumber"
          type="number"
          placeholder="Lot Number"
          onChange={handleChange}
        />
        <label htmlFor="molecularFormula">Molecular Formula</label>
        {/* <FormulaInput
          id="molecularFormula"
          value={formData.molecularFormula}
          onChange={(value) => handleChange({ target: { id: 'molecularFormula', value } })}
        /> */}

        <Input
          disable={loading}
          value={formData.purity}
          id="purity"
          type="text"
          placeholder="Purity"
          onChange={handleChange}
        />

        <Select
          placeholder="Select a location"
          value={locationOptions.find((opt) => opt.value === formData.location)}
          options={locationOptions}
          onChange={(selectedLocation) => handleChangeOption(selectedLocation, 'location')}
          styles={selectStyle}
          isClearable
        />

        <Input
          disable={loading}
          value={formData.brand}
          id="brand"
          type="text"
          placeholder="Brand"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.supply}
          id="supply"
          type="number"
          placeholder="Supply"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.unit}
          id="unit"
          type="text"
          placeholder="How many bottles?"
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <label>Date of Purchase: </label>
          <Input
            disable={loading}
            value={formData.purchaseDate}
            id="purchaseDate"
            type="date"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Expiry Date: </label>
          <Input disable={loading} value={formData.expiryDate} id="expiryDate" type="date" onChange={handleChange} />
        </div>
        <Input
          disable={loading}
          value={formData.sds}
          id="sds"
          type="text"
          placeholder="Safety Data Sheet URL"
          onChange={handleChange}
        />

        <Input
          disable={loading}
          value={formData.status}
          id="status"
          type="text"
          placeholder="Status"
          onChange={handleChange}
        />

        <Select
          placeholder="Select a Hazard Classification"
          value={hazardClassificationOptions.find((opt) => opt.value === formData.hazardClassification)}
          options={hazardClassificationOptions}
          onChange={(selectedClassification) => handleChangeOption(selectedClassification, 'hazardClassification')}
          styles={selectStyle}
          isClearable
        />

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
          <Button disable={loading}>Add Chemical</Button>
        </div>
      </form>
      {error && <div className="text-red-500">There was an error processing your request.</div>}
    </div>
  );
}

export default Chemical;
