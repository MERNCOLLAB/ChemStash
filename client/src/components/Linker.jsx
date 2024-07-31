import { NavLink } from 'react-router-dom';

function Linker({ to, children }) {
  return (
    <NavLink className={({ isActive }) => ` ${isActive ? 'active' : ''} relative flex items-center gap-2`} to={to}>
      {children}
    </NavLink>
  );
}

export default Linker;
