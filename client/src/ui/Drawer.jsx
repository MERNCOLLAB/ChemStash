import { useEffect, useState } from 'react';

function Drawer({ isOpen, children, onClose }) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <div className={`drawer drawer-end z-10`}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={open} onChange={onClose} />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="" onClick={onClose}></label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className={`drawer-overlay ${open ? 'backdrop-blur-[1px]' : ''}`}
          onClick={onClose}
        ></label>
        {children}
      </div>
    </div>
  );
}

export default Drawer;
