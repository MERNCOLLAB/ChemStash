import { Input, Button, FormulaInput } from '../components';
import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';
import useChemicalForm from '../hooks/chemical/useChemicalForm';
import useUpdateChemicalDrawer from '../hooks/chemical/useUpdateChemicalDrawer';

function UpdateChemicalForm({ item, handleUpdate }) {
  const { locationOptions, hazardClassificationOptions } = useChemicalForm();
  const { updatedItem, handleChange, handleChangeOption, onUpdate } = useUpdateChemicalDrawer(item, handleUpdate);

  return (
    <form className="menu p-4 w-80 min-h-full text-base-content bg-slate-800" onSubmit={onUpdate}>
      <ul>
        <li>
          {/* Chemical Name */}
          <label>Chemical Name</label>
          <Input value={updatedItem.name} id="name" type="text" placeholder="Name" onChange={handleChange} />
        </li>

        <li>
          <label>Batch</label>
          <Input
            value={updatedItem.batch}
            id="batch"
            type="number"
            placeholder="Batch Number"
            onChange={handleChange}
          />
        </li>

        {/* Molecular Formula */}
        <li className="space-y-2">
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
            id="lotNumber"
            type="number"
            placeholder="Lot Number"
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

        {/* Amount */}
        <li>
          <label>Amount</label>
          <Input value={updatedItem.amount} id="amount" type="number" placeholder="Amount" onChange={handleChange} />
        </li>

        {/*  Unit */}
        <li>
          <label>Unit</label>
          <Input
            value={updatedItem.unit}
            id="unit"
            type="text"
            placeholder="Unit (eg. L or grams)"
            onChange={handleChange}
          />
        </li>

        {/* Date Received */}
        <li>
          <label>Date Received</label>
          <Input value={updatedItem.dateReceived} id="dateReceived" type="date" onChange={handleChange} />
        </li>
        <li>
          {/* Expiry Date */}
          <label>Expiry Date</label>
          <Input value={updatedItem.expiryDate} id="expiryDate" type="date" onChange={handleChange} />
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

      <Button type="submit" variant="primary" className="btn btn-primary mt-4">
        Update
      </Button>
    </form>
  );
}

export default UpdateChemicalForm;
