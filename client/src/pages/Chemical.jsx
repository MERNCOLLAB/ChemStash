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
        <Input
          disable={loading}
          value={formData.location}
          id="location"
          type="text"
          placeholder="Location"
          onChange={handleChange}
        />
        <Input
          disable={loading}
          value={formData.supplier}
          id="supplier"
          type="text"
          placeholder="Supplier"
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
