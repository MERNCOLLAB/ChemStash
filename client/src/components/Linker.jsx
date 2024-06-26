import { NavLink } from 'react-router-dom';

function Linker({ to, children }) {
  return (
    <NavLink className={({ isActive }) => ` ${isActive ? 'active' : ''} relative`} to={to}>
      {children}
    </NavLink>
  );
}

export default Linker;
