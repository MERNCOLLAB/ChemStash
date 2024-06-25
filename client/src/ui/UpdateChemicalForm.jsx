import { Input, Button, FormulaInput } from '../components';
import Select from 'react-select';
import { location, hazardClassifications, chemicalStatus } from '../constants';
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
  return (
    <form className="menu p-4 w-80 min-h-full text-base-content bg-slate-800" onSubmit={onUpdate}>
      <ul>
        <li>
          {/* Chemical Name */}
          <label>Chemical Name</label>
          <Input value={updatedItem.name} id="name" type="text" placeholder="Name" onChange={handleChange} />
        </li>

        {/* Molecular Formula */}
        <li className="space-y-2">
          <label>Molecular Formula</label>
          <FormulaInput
            id="molecularFormula"
            value={updatedItem.molecularFormula}
            onChange={(value) => handleChange({ target: { id: 'molecularFormula', value } })}
          />
        </li>

        <li>
          {/* Lot Number */}
          <label>Lot Number</label>
          <Input
            value={updatedItem.lotNumber}
            id="casNumber"
            type="number"
            placeholder="CAS Number"
            onChange={handleChange}
          />
        </li>

        {/* Purity */}
        <li>
          <label>Purity</label>
          <Input value={updatedItem.purity} id="purity" type="text" placeholder="Purity" onChange={handleChange} />
        </li>

        {/* Location */}
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

        {/* Brand */}
        <li>
          <label>Brand</label>
          <Input value={updatedItem.brand} id="brand" type="text" placeholder="Brand" onChange={handleChange} />
        </li>

        {/* Number of Supply */}
        <li>
          <label>Supply</label>
          <Input value={updatedItem.supply} id="supply" type="number" placeholder="Supply" onChange={handleChange} />
        </li>
        {/*  Unit */}
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

        {/* Purchase Date */}
        <li>
          <label>Purchase Date</label>
          <Input value={updatedItem.purchaseDate} id="purchaseDate" type="date" onChange={handleChange} />
        </li>
        <li>
          {/* Expiry Date */}
          <label>Expiry Date</label>
          <Input value={updatedItem.expiryDate} id="expiryDate" type="date" onChange={handleChange} />
        </li>

        {/* Chemical Status */}
        <li>
          <label>Status</label>
          <Select
            placeholder="Select a Status"
            value={chemicalStatusOptions.find((opt) => opt.value === updatedItem.status)}
            options={chemicalStatusOptions}
            onChange={(selectedStatus) => handleChangeOption(selectedStatus, 'status')}
            styles={selectStyle}
            isClearable
          />
        </li>

        {/* Hazard Classification */}
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

        {/* Safety Data Sheet */}
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

        {/* Remarks */}
        <li>
          <label>Remarks</label>
          <Input value={updatedItem.remarks} id="remarks" type="text" placeholder="Remarks" onChange={handleChange} />
        </li>
      </ul>

      <Button type="submit" variant="form" className="btn btn-primary mt-4">
        Update
      </Button>
    </form>
  );
}

export default UpdateChemicalForm;
