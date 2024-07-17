import CustomSelect from '../components/CustomSelect';
import { Button, FormHeader, FormSubHeader, FormContainer, Input } from '../components';
import useChemicalForm from '../hooks/chemical/useChemicalForm';
import useAddChemical from '../api/chemical/useAddChemical';

function Chemical() {
  const { locationOptions, hazardClassificationOptions, formData, handleSubmit, handleChange, handleChangeOption } =
    useChemicalForm();

  const { loading } = useAddChemical();

  // Basic Information Section
  // First Row: Chemical Name, Molecular Formula, Brand
  const basicInfoFirstRow = (
    <>
      <Input
        disable={loading}
        value={formData.name}
        id="name"
        type="text"
        label="Chemical Name"
        placeholder="Enter chemical name"
        onChange={handleChange}
        validation="General compound name"
      />
      <Input
        disable={loading}
        value={formData.molecularFormula}
        id="molecularFormula"
        label="Molecular Formula"
        placeholder="Enter Molecular Formula"
        onChange={handleChange}
        validation="Please enter the chemical formula (eg. Ba2SO4)"
      />
      <Input
        label="Brand"
        disable={loading}
        value={formData.brand}
        id="brand"
        type="text"
        placeholder="Enter Brand"
        onChange={handleChange}
        validation="Please enter the chemical brand (eg. Merck, Sigma Aldrich)"
      />
    </>
  );

  // Second Row: Purity, Batch Number, CAS Number
  const basicInfoSecondRow = (
    <>
      <Input
        label="Purity"
        disable={loading}
        value={formData.purity}
        id="purity"
        type="text"
        placeholder="Enter Purity"
        onChange={handleChange}
        validation="Please enter the purity (eg., Lab Grade, Tech Grade)"
      />
      <Input
        disable={loading}
        value={formData.batch}
        id="batch"
        type="number"
        label="Batch Number"
        placeholder="Enter Batch Number"
        onChange={handleChange}
        validation="Please enter a valid batch number (e.g., 1001, 2002)"
      />
      <Input
        disable={loading}
        value={formData.casNumber}
        id="casNumber"
        type="number"
        label="CAS Registry Number"
        placeholder="Enter CAS Number"
        onChange={handleChange}
        validation="Please enter a valid lot number (e.g., 001, 002)"
      />
    </>
  );

  // Storage Information Section
  // First Row: Location, Date Received, Expiry Date
  const storageInfoFirstRow = (
    <>
      <CustomSelect
        label="Storage Location"
        validation="Enter where are you going to store the chemical"
        placeholder="Select a location"
        value={locationOptions.find((opt) => opt.value === formData.location)}
        options={locationOptions}
        onChange={(selectedLocation) => handleChangeOption(selectedLocation, 'location')}
      />
      <Input
        label="Date Received"
        disable={loading}
        value={formData.dateReceived}
        id="dateReceived"
        type="date"
        onChange={handleChange}
        validation="Enter the date the chemical received in mm/dd/yy"
      />
      <Input
        label="Expiry Date"
        disable={loading}
        value={formData.expiryDate}
        id="expiryDate"
        type="date"
        onChange={handleChange}
        validation="Enter the chemical expiry date in mm/dd/yy"
      />
    </>
  );

  const storageInfoSecondRow = (
    <>
      <Input
        label="Supply"
        disable={loading}
        value={formData.supply}
        id="supply"
        type="number"
        placeholder="Enter the Number of Supply"
        onChange={handleChange}
        validation="Please enter the number of bottles or container"
      />
      <Input
        label="Amount"
        disable={loading}
        value={formData.amount}
        id="amount"
        type="number"
        placeholder="Enter Amount"
        onChange={handleChange}
        validation="Please enter the amount or quantity of the chemical"
      />
      <Input
        label="Expression Unit"
        disable={loading}
        value={formData.unit}
        id="unit"
        type="text"
        placeholder="Enter Unit"
        onChange={handleChange}
        validation="Please enter the unit of expression for the amount(eg. L, grams)"
      />
    </>
  );

  // Safety Information Section
  // First Row: Hazard Classification, Safety Data Sheet, Remarks
  const safetyInfoRow = (
    <>
      <CustomSelect
        label="Hazard Classification"
        validation="Enter the chemical hazard classification (GHS Standard)"
        placeholder="Select a classification"
        value={hazardClassificationOptions.find((opt) => opt.value === formData.hazardClassification)}
        options={hazardClassificationOptions}
        onChange={(selectedClassification) => handleChangeOption(selectedClassification, 'hazardClassification')}
      />
      <Input
        label="Safety Data Sheet"
        disable={loading}
        value={formData.sds}
        id="sds"
        type="text"
        placeholder="SDS Link"
        onChange={handleChange}
        validation="Please enter the safety data sheet URL"
      />
      <Input
        label="Additional Notes"
        disable={loading}
        value={formData.remarks}
        id="remarks"
        type="text"
        placeholder="Enter Remarks"
        onChange={handleChange}
        validation="Optional remarks"
      />
    </>
  );
  return (
    <div className="p-7  min-h-full  bg-white0 max-w-fit">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <FormHeader title="Add Chemical" />
        {/* Basic Info */}
        <FormSubHeader title="Basic Info" subtitle="Basic information of the chemical" />
        <FormContainer gridColsClass={3}>{basicInfoFirstRow}</FormContainer>
        <FormContainer gridColsClass={3}>{basicInfoSecondRow}</FormContainer>
        {/* Storage Info */}
        <FormSubHeader title="Storage Info" subtitle="Details about the storage and quantity of the chemical" />
        <FormContainer gridColsClass={3}>{storageInfoFirstRow}</FormContainer>
        <FormContainer gridColsClass={3}>{storageInfoSecondRow}</FormContainer>

        {/* Safety Info */}
        <FormSubHeader title="Safety Info" subtitle="Hazard classification and reference safety data sheet" />
        <FormContainer gridColsClass={3}>{safetyInfoRow}</FormContainer>

        <div className="flex justify-end mt-4 gap-2.5 p-2.5">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Chemical;
