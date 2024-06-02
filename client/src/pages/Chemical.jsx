import { useState } from 'react';
import Button from '../components/Button';
import { Input } from '../components/Input';

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

  const location = [
    'Flammable Storage Cabinet',
    'Corrosive Storage Cabinet',
    'Refrigerator/Freezer',
    'General Storage Shelf',
    'Oxidizer Storage Shelf',
    'Gas Cylinder Storage',
    'Others',
  ];
  const hazardClassifications = [
    'Not Applicable',
    'Explosives',
    'Flammable',
    'Oxidizing',
    'Corrosive',
    'Toxic',
    'Health Hazard',
    'Environmental Hazard',
    'Gases Under Pressure',
  ];

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
      });
      alert('Chemical successfully created');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  console.log(formData);
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

        <select
          id="location"
          className="bg-slate-900 p-3 border"
          onChange={handleChange}
          value={formData.location}
        >
          <option value="" disabled selected className="">
            Select Location
          </option>
          {location.map((loc, index) => (
            <option className="cursor-pointer" key={index}>
              {loc}
            </option>
          ))}
        </select>

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

        <select
          id="hazardClassification"
          className="bg-slate-900 p-3 border"
          value={formData.hazardClassification}
          onChange={handleChange}
        >
          <option value="" disabled selected className="">
            Select Hazard Classification
          </option>
          {hazardClassifications.map((hazard, index) => (
            <option className="cursor-pointer" key={index}>
              {hazard}
            </option>
          ))}
        </select>
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
