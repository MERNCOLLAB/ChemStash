import { Linker } from '../components';
import { useSelector } from 'react-redux';
function LeftNavbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ul className="flex flex-col gap-[10px]">
      <li>
        <Linker to="dashboard">Dashboard</Linker>
      </li>
      <li>
        <Linker to="inventory">Inventory</Linker>
      </li>
      <li>
        <Linker to="board">Board Planner</Linker>
      </li>
      {currentUser.role === 'manager' ? (
        <li>
          <Linker to="users">Users</Linker>
        </li>
      ) : null}
      <li>
        <Linker to="map">Map</Linker>
      </li>
      <li>
        <Linker to="profile">Profile</Linker>
      </li>
    </ul>
  );
}

export default LeftNavbar;
