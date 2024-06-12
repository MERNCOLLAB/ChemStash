import { Input, Select, FormulaInput } from '../components';
import { hazardClassifications, location } from '../constants';
import { useEffect, useState } from 'react';
import { formatDate } from '../helpers/FormatDate';

function UpdateChemicalForm({ item, handleUpdate }) {
  const [updatedItem, setUpdatedItem] = useState({
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
    hazardClassification: '',
    sds: '',
    remarks: '',
    ...item,
  });

  useEffect(() => {
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      ...item,
      purchaseDate: formatDate(item.purchaseDate),
      expiryDate: formatDate(item.expiryDate),
    }));
  }, [item]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    handleUpdate(updatedItem);
  };

  return (
    <form className="menu p-4 w-80 min-h-full text-base-content bg-slate-800" onSubmit={onUpdate}>
      <ul>
        <li>
          <label>Chemical Name</label>
          <Input value={updatedItem.name} id="name" type="text" placeholder="Name" onChange={handleChange} />
        </li>
        <li>
          <label>CAS Number</label>
          <Input
            value={updatedItem.casNumber}
            id="casNumber"
            type="number"
            placeholder="CAS Number"
            onChange={handleChange}
          />
        </li>
        <li>
          <label htmlFor="molecularFormula">Molecular Formula</label>
          <FormulaInput
            id="molecularFormula"
            value={updatedItem.molecularFormula}
            onChange={(value) => handleChange({ target: { id: 'molecularFormula', value } })}
          />
        </li>
        <li>
          <label>Purity</label>
          <Input value={updatedItem.purity} id="purity" type="text" placeholder="Purity" onChange={handleChange} />
        </li>
        <li>
          <label>Location</label>
          <Select
            id="location"
            value={updatedItem.location}
            onChange={handleChange}
            disabledValue="Select your storage location"
            options={location}
          />
        </li>
        <li>
          <label>Supplier</label>
          <Input
            value={updatedItem.supplier}
            id="supplier"
            type="text"
            placeholder="Supplier"
            onChange={handleChange}
          />
        </li>
        <li>
          <label>Quantity</label>
          <Input
            value={updatedItem.quantity}
            id="quantity"
            type="number"
            placeholder="Chemical Quantity"
            onChange={handleChange}
          />
        </li>
        <li>
          <label>Unit</label>
          <Input
            value={updatedItem.unit}
            id="unit"
            type="text"
            placeholder="Unit for the Quantity"
            onChange={handleChange}
          />
        </li>
        <li>
          <label>Purchase Date</label>
          <Input value={updatedItem.purchaseDate} id="purchaseDate" type="date" onChange={handleChange} />
        </li>
        <li>
          <label>Expiry Date</label>
          <Input value={updatedItem.expiryDate} id="expiryDate" type="date" onChange={handleChange} />
        </li>
        <li>
          <label>Hazard Classification</label>
          <Select
            id="hazardClassification"
            value={updatedItem.hazardClassification}
            onChange={handleChange}
            disabledValue="Select the Hazard Classification"
            options={hazardClassifications}
          />
        </li>
        <li>
          <label>SDS</label>
          <Input
            value={updatedItem.sds}
            id="sds"
            type="text"
            placeholder="Safety Data Sheet URL"
            onChange={handleChange}
          />
        </li>
        <li>
          <label>Remarks</label>
          <Input value={updatedItem.remarks} id="remarks" type="text" placeholder="Remarks" onChange={handleChange} />
        </li>
      </ul>

      <button type="submit" className="btn btn-primary mt-4">
        Update
      </button>
    </form>
  );
}

export default UpdateChemicalForm;
