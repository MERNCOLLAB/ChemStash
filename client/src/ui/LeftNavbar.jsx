import { Linker } from '../components';

function LeftNavbar() {
  return (
    <ul className="flex  gap-4">
      <li>
        <Linker to="inventory">Inventory</Linker>
      </li>
      <li>
        <Linker to="users">Users</Linker>
      </li>
      <li>
        <Linker to="chemical">Add Chemical</Linker>
      </li>
      <li>
        <Linker to="link-3">Linker 3</Linker>
      </li>
    </ul>
  );
}

export default LeftNavbar;
