import { Input, FormulaInput } from '../components';
import Select from 'react-select';
import { location, hazardClassifications } from '../constants';
import { transformArrayToOptions } from '../helpers/transformArray';
import { selectStyle } from '../helpers/selectStyle';
import { useEffect, useState } from 'react';
import { formatDate } from '../helpers/FormatDate';
import { initialChemicals } from '../constants';

function UpdateChemicalForm({ item, handleUpdate }) {
  const locationOptions = transformArrayToOptions(location);
  const hazardClassificationOptions = transformArrayToOptions(hazardClassifications);
  const chemicalStatusOptions = transformArrayToOptions(chemicalStatus);

  const [updatedItem, setUpdatedItem] = useState({ ...initialChemicals, ...item });

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

        <li className="flex items-center gap-2">
          <label className="flex-1 text-center">Molecular Formula</label>
          <FormulaInput
            id="molecularFormula"
            value={formData.molecularFormula}
            onChange={(value) => handleChange({ target: { id: 'molecularFormula', value } })}
          />
        </li>

        <li>
          <label>Lot Number</label>
          <Input
            value={updatedItem.lotNumber}
            id="lotNumber"
            type="number"
            placeholder="Lot Number"
            onChange={handleChange}
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
          <label>Brand</label>
          <Input value={updatedItem.brand} id="supplier" type="text" placeholder="Supplier" onChange={handleChange} />
        </li>

        <li>
          <label>Supply</label>
          <Input value={updatedItem.supply} id="supply" type="number" placeholder="Supply" onChange={handleChange} />
        </li>

        <li>
          <label>Unit</label>
          <Input
            value={updatedItem.unit}
            id="unit"
            type="text"
            placeholder="Unit (eg. Bottle)"
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
          <label>Status</label>
          <Select
            placeholder="Status"
            value={chemicalStatusOptions.find((opt) => opt.value === formData.status)}
            options={chemicalStatusOptions}
            onChange={(selectedStatus) => handleChangeOption(selectedStatus, 'status')}
            styles={selectStyle}
            isClearable
          />
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
