import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ role }) {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.role === role ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
