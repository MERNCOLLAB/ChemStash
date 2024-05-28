import { Linker } from "../components/Linker";

function LeftNavbar() {
  return (
    <ul className="flex flex-col gap-4">
      <li>
        <Linker to="inventory">Inventory</Linker>
      </li>
      <li>
        <Linker to="users">List of Users</Linker>
      </li>
      <li>
        <Linker to="link-2">Linker 2</Linker>
      </li>
      <li>
        <Linker to="link-3">Linker 3</Linker>
      </li>
    </ul>
  );
}

export default LeftNavbar;
