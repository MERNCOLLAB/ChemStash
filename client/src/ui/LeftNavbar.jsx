import { Linker } from '../components';
import { useSelector } from 'react-redux';
import { CiViewTable } from 'react-icons/ci';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { RiAlignItemBottomLine } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';
import { CiMap } from 'react-icons/ci';
import { LuUser } from 'react-icons/lu';
function LeftNavbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ul className="flex flex-col gap-[10px]">
      <li>
        <Linker to="dashboard">
          <RiAlignItemBottomLine className="text-[16px]" />
          Dashboard
        </Linker>
      </li>
      <li>
        <Linker to="inventory">
          <CiViewTable className="text-[16px]" />
          Inventory
        </Linker>
      </li>
      <li>
        <Linker to="board">
          <HiOutlineClipboardDocumentCheck className="text-[16px]" />
          Board Planner
        </Linker>
      </li>
      {currentUser.role === 'manager' ? (
        <li>
          <Linker to="users">
          <FiUsers className="text-[16px] " />
            Users
          </Linker>
        </li>
      ) : null}
      <li>
        <Linker to="map">
          <CiMap className="text-[16px]" />
          Map
        </Linker>
      </li>
      <li>
        <Linker to="profile">
      
          <LuUser className="text-[16px] mb-1" />
          Profile
        </Linker>
      </li>
    </ul>
  );
}

export default LeftNavbar;
