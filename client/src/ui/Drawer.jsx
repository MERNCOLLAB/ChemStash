import { useState, useEffect } from 'react';
import { formatDate } from '../helpers/FormatDate';
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
    const { name, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

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
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={updatedItem.name}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>CAS Number</label>
                  <input
                    type="number"
                    name="casNumber"
                    defaultValue={updatedItem.casNumber}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Molecular Formula</label>
                  <input
                    type="text"
                    name="molecularFormula"
                    defaultValue={updatedItem.molecularFormula}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Purity</label>
                  <input
                    type="text"
                    name="purity"
                    defaultValue={updatedItem.purity}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={updatedItem.location}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    defaultValue={updatedItem.supplier}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={updatedItem.quantity}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Unit</label>
                  <input
                    type="text"
                    name="unit"
                    defaultValue={updatedItem.unit}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    defaultValue={updatedItem.purchaseDate}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    defaultValue={updatedItem.expiryDate}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>

                <li>
                  <label>Hazard Classification</label>
                  <input
                    type="text"
                    name="hazardClassification"
                    defaultValue={updatedItem.hazardClassification}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>SDS</label>
                  <input
                    type="text"
                    name="sds"
                    defaultValue={updatedItem.sds}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </li>
                <li>
                  <label>Remarks</label>
                  <input
                    type="text"
                    name="remarks"
                    defaultValue={updatedItem.remarks}
                    onChange={handleChange}
                    className="input input-bordered"
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
                <li>{item.name}</li>
                <li>{item.casNumber}</li>
                <li>{item.molecularFormula}</li>
                <li>{item.purity}</li>
                <li>{item.location}</li>
                <li>{item.supplier}</li>
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
