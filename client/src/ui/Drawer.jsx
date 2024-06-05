import { useState, useEffect } from 'react';
import { formatDate } from '../helpers/FormatDate';
import { Select, Input } from '../components';
import { hazardClassifications, location } from '../constants';
import useSubSup from '../hooks/useSubSup';
import { MdSubscript, MdSuperscript } from 'react-icons/md';

function Drawer({ isOpen, toggleDrawer, item, onDelete, onUpdate, isUpdate }) {
  const [open, setOpen] = useState(isOpen);
  const [updatedItem, setUpdatedItem] = useState({ ...item });

  useEffect(() => {
    setUpdatedItem({
      ...item,
      purchaseDate: formatDate(item.purchaseDate),
      expiryDate: formatDate(item.expiryDate),
    });
  }, [item]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };
  const { pRef, showButton, handleFocus, handleBlur, toggleSuperscript, toggleSubscript } = useSubSup(handleChange);
  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(updatedItem);
  };

  if (!item) return null;

  return (
    <div className={`drawer drawer-end z-10`}>
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => setOpen(!open)}
      />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary hidden" onClick={toggleDrawer}>
          {/* Open drawer */}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleDrawer}
        ></label>
        <form className="menu p-4 w-80 min-h-full text-base-content bg-slate-800" onSubmit={handleUpdate}>
          {isUpdate ? (
            <>
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
                  <label>Molecular Formula</label>
                  <div className="flex">
                    <p
                      id="molecularFormula"
                      ref={pRef}
                      contentEditable
                      className="bg-slate-900 p-3 border outline-none flex-grow"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    ></p>
                    {showButton && (
                      <div className="flex items-center gap-2 p-2">
                        <button
                          className="rounded-xl bg-slate-500 p-2"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={toggleSuperscript}
                        >
                          <MdSuperscript />
                        </button>
                        <button
                          className="rounded-xl bg-slate-500 p-2"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={toggleSubscript}
                        >
                          <MdSubscript />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <label>Purity</label>
                  <Input
                    value={updatedItem.purity}
                    id="purity"
                    type="text"
                    placeholder="Purity"
                    onChange={handleChange}
                  />
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
                  <Input
                    value={updatedItem.remarks}
                    id="remarks"
                    type="text"
                    placeholder="Remarks"
                    onChange={handleChange}
                  />
                </li>
              </ul>

              <button type="submit" className="btn btn-primary mt-4">
                Update
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Drawer;
