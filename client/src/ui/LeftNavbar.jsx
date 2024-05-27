import { Link } from "react-router-dom";

function LeftNavbar() {
  return (
    <ul className="flex flex-col gap-4">
      <li>
        <Link to="inventory">Inventory</Link>
      </li>
      <li>
        <Link to="link-1">Link 1</Link>
      </li>
      <li>
        <Link to="link-2">Link 2</Link>
      </li>
      <li>
        <Link to="link-3">Link 2</Link>
      </li>
    </ul>
  );
}

export default LeftNavbar;
