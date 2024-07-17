import { Button, FormHeader, FormSubHeader, ViewChemicalData, ChemicalFormula } from '../components';

function DeleteChemicalForm({ item, onDelete, handleDrawerClose }) {
  // Basic Information Section
  // First Row: Chemical Name, Molecular Formula, Brand
  const basicInfoFirstRow = (
    <>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Chemical Name">
        {item.name}
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Molecular Formula">
        <ChemicalFormula formula={item.molecularFormula} />
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Brand">
        {item.brand}
      </ViewChemicalData>
    </>
  );

  // Second Row: Purity, Batch Number, Lot Number
  const basicInfoSecondRow = (
    <>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Purity">
        {item.purity}
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Batch Number">
        {item.batch}
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Lot Number">
        {item.casNumber}
      </ViewChemicalData>
    </>
  );

  // Storage Information Section
  // First Row: Location, Date Received, Expiry Date
  const storageInfoFirstRow = (
    <>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Location">
        {item.location}
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Date Received">
        {item.dateReceived}
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Expiry Date">
        {item.expiryDate}
      </ViewChemicalData>
    </>
  );

  // Second Row: Supply, Amount, Unit
  const storageInfoSecondRow = (
    <>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Number of Supply">
        {item.supply}
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Amount">
        {item.amount} &nbsp; {item.unit}
      </ViewChemicalData>
    </>
  );

  // Safety Information Section
  const safetyInfoRow = (
    <>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Hazard Classification">
        {item.hazardClassification}
      </ViewChemicalData>
      <ViewChemicalData gridColsClass="grid-cols-1" label="Remarks">
        {item.remarks}
      </ViewChemicalData>
    </>
  );
  return (
    <form className="p-7 min-w-[49%]  min-h-full bg-white0" onSubmit={onDelete}>
      <FormHeader title="Delete Chemical" />
      {/* Basic Info */}
      <FormSubHeader title="Basic Info" subtitle="Basic information of the chemical" />
      <div className="grid grid-cols-3">{basicInfoFirstRow}</div>
      <div className="grid grid-cols-3">{basicInfoSecondRow}</div>

      {/* Storage Info */}
      <FormSubHeader title="Storage Info" subtitle="Details about the storage and quantity of the chemical" />
      <div className="grid grid-cols-3">{storageInfoFirstRow}</div>
      <div className="grid grid-cols-3">{storageInfoSecondRow}</div>

      {/* Safety Info */}
      <FormSubHeader title="Safety Info" subtitle="Hazard classification and reference safety data sheet" />
      <div className="grid grid-cols-3">{safetyInfoRow}</div>

      <div className="flex justify-end mt-4 gap-2.5 p-2.5">
        <Button type="button" variant="secondary" onClick={handleDrawerClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Delete
        </Button>
      </div>
    </form>
  );
}

export default DeleteChemicalForm;
