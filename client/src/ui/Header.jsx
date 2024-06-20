import { useSelector } from 'react-redux';
import { Linker } from '../components';
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const getLinkerPath = () => {
    if (!currentUser) return '/sign-in';
    switch (currentUser.role) {
      case 'admin':
        return '/profile';
      case 'chemist':
        return '/chemist-profile';
      case 'controller':
        return '/controller-profile';
      default:
        return '/';
    }
  };
  return (
    <div className="mx-auto border">
      <div className="flex justify-between items-center  mx-auto p-3">
        <Linker to="/">
          <h1 className="font-bold">Chemstack</h1>
        </Linker>
        <ul className="flex gap-4 items-center">
          <Linker to="/dashboard">
            <li>Dashboard</li>
          </Linker>
          <Linker to="/manager/inventory">
            <li>Inventory</li>
          </Linker>
          {currentUser && <Linker to={`${currentUser.role}/board`}>Board</Linker>}
          {/* <Linker to="/">
            <li>Home</li>
          </Linker>
          <Linker to="/about">
            <li>About</li>
          </Linker> */}

          <Linker to={getLinkerPath()}>
            {currentUser ? (
              <img
                className="border rounded-full h-10 w-10 object-cover"
                src={currentUser.profilePicture}
                alt="Profile"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Linker>
        </ul>
      </div>
    </div>
  );
}

export default Header;
