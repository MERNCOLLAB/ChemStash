function DeleteChemicalForm({ item, onDelete }) {
  return (
    <div className="menu p-4 w-80 min-h-full text-base-content bg-slate-800">
      <ul>
        <li>Name: {item.name}</li>
        <li>CAS Number: {item.casNumber}</li>
        <li>Molecular Formula: {item.molecularFormula}</li>
        <li>Purity: {item.purity}</li>
        <li>Location: {item.location}</li>
        <li>Supplier: {item.supplier}</li>
        <li>Quantity: {item.quantity}</li>
        <li>Unit: {item.unit}</li>
        <li>Purchase Date: {item.purchaseDate}</li>
        <li>Expiry Date: {item.expiryDate}</li>
        <li>Hazard: {item.hazardClassification}</li>
        <li>Remarks: {item.remarks}</li>
      </ul>
      <button type="button" className="btn btn-danger mt-4" onClick={() => onDelete(item._id)}>
        Delete
      </button>
    </div>
  );
}

export default DeleteChemicalForm;
