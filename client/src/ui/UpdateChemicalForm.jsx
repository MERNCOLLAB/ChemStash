import { Input, FormulaInput } from '../components';
import Select from 'react-select';
import { location, hazardClassifications } from '../constants';
import { transformArrayToOptions } from '../helpers/transformArray';
import { selectStyle } from '../helpers/selectStyle';
import { useEffect, useState } from 'react';
import { formatDate } from '../helpers/FormatDate';

function UpdateChemicalForm({ item, handleUpdate }) {
  const locationOptions = transformArrayToOptions(location);
  const hazardClassificationOptions = transformArrayToOptions(hazardClassifications);
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

  const handleChangeOption = (selectedOption, field) => {
    setUpdatedItem({
      ...updatedItem,
      [field]: selectedOption ? selectedOption.value : '',
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    handleUpdate(updatedItem);
  };
  console.log(updatedItem);
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
            placeholder="Select a location"
            value={locationOptions.find((opt) => opt.value === updatedItem.location)}
            options={locationOptions}
            onChange={(selectedLocation) => handleChangeOption(selectedLocation, 'location')}
            styles={selectStyle}
            isClearable
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
            placeholder="Select a Hazard Classification"
            value={hazardClassificationOptions.find((opt) => opt.value === updatedItem.hazardClassification)}
            options={hazardClassificationOptions}
            onChange={(selectedClassification) => handleChangeOption(selectedClassification, 'hazardClassification')}
            styles={selectStyle}
            isClearable
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
