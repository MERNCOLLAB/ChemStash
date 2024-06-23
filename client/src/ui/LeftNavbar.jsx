import { Linker } from '../components';
import { useSelector } from 'react-redux';
function LeftNavbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ul className="flex  gap-4">
      <li>
        <Linker to="inventory">Inventory</Linker>
      </li>
      {currentUser.role === 'manager' ? (
        <li>
          <Linker to="users">Users</Linker>
        </li>
      ) : null}
      <li>
        <Linker to="chemical">Add Chemical</Linker>
      </li>
      <li>
        <Linker to="map">Map</Linker>
      </li>
    </ul>
  );
}

export default LeftNavbar;
