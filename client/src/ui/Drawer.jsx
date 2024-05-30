import { useState } from "react";

function Drawer({ isOpen, toggleDrawer, itemDelete, deleteItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="drawer drawer-end z-10">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => setOpen(!open)}
      />
      <div className="drawer-content">
        {/* Page content here */}
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
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>{itemDelete.name}</li>
          <li>{itemDelete.casNumber}</li>
          <li>{itemDelete.molecularFormula}</li>
          <li>{itemDelete.location}</li>
          <li>{itemDelete.supplier}</li>
          <button onClick={() => deleteItem(itemDelete._id)}>Delete</button>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
