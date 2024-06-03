import { useState } from 'react';
import { Button, Input, Select } from '../components';
import { location, hazardClassifications } from '../constants';

function Chemical() {
  const [formData, setFormData] = useState({
    name: '',
    casNumber: '',
    molecularFormula: '',
    purity: '',
    location: '',
    supplier: '',
    quantity: '',
    unit: '',
    purchaseDate: '',
    expiryDate: '',
    sds: '',
    hazardClassification: '',
    remarks: '',
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'number' ? Number(value) : value,
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
      setFormData({
        name: '',
        casNumber: '',
        molecularFormula: '',
        purity: '',
        location: '',
        supplier: '',
        quantity: '',
        unit: '',
        purchaseDate: '',
        expiryDate: '',
        sds: '',
        hazardClassification: '',
        remarks: '',
      });
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
          value={formData.casNumber}
          id="casNumber"
          type="number"
          placeholder="CAS Number"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.molecularFormula}
          id="molecularFormula"
          type="text"
          placeholder="Molecular Formula"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.purity}
          id="purity"
          type="text"
          placeholder="Purity"
          onChange={handleChange}
        />

        <Select
          id="location"
          value={formData.location}
          onChange={handleChange}
          disabledValue="Select your storage location"
          options={location}
        />

        <Input
          disable={loading}
          value={formData.supplier}
          id="supplier"
          type="text"
          placeholder="Supplier"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.quantity}
          id="quantity"
          type="number"
          placeholder="Chemical Quantity"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.unit}
          id="unit"
          type="text"
          placeholder="Unit for the Quantity"
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

        <Select
          id="hazardClassification"
          value={formData.hazardClassification}
          onChange={handleChange}
          disabledValue="Select the Hazard Classification"
          options={hazardClassifications}
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
