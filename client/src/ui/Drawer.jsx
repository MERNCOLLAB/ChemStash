import { useState, useEffect } from "react";

function Drawer({ isOpen, toggleDrawer, item, onDelete, onUpdate, isUpdate }) {
  const [open, setOpen] = useState(isOpen);
  const [updatedItem, setUpdatedItem] = useState({ ...item });

  useEffect(() => {
    setUpdatedItem({ ...item });
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
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-primary hidden"
          onClick={toggleDrawer}
        >
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
        <form
          className="menu p-4 w-80 min-h-full text-base-content bg-slate-800"
          onSubmit={handleUpdate}
        >
          {isUpdate ? (
            <>
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
       
              <button type="submit" className="btn btn-primary mt-4">
                Update
              </button>
            </>
          ) : (
            <>
              <li>{item.name}</li>
              <li>{item.casNumber}</li>
              <li>{item.molecularFormula}</li>
              <li>{item.purity}</li>
              <li>{item.location}</li>
              <li>{item.supplier}</li>
              <button
                type="button"
                className="btn btn-danger mt-4"
                onClick={() => onDelete(item._id)}
              >
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
