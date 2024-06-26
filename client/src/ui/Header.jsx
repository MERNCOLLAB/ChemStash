import { useSelector } from 'react-redux';
import { Linker } from '../components';
import { useEffect, useState } from 'react';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.notification);
  const [notification, setNotification] = useState([]);
  const username = currentUser.username;
  const getLinkerPath = () => {
    if (!currentUser) return '/sign-in';
    switch (currentUser.role) {
      case 'manager':
        return '/profile';
      case 'chemist':
        return '/chemist-profile';
      case 'purchacer':
        return '/purchacer-profile';
      case 'tl':
        return '/tl-profile';
      default:
        return '/';
    }
  };

  useEffect(() => {
    socket?.on('getNotification', (data) => {
      if (data.senderName !== username) {
        setNotification((prev) => [...prev, data]);
      }
    });
  }, [socket, username]);
  console.log(notification);
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
          <Linker to={`${currentUser?.role}/inventory`}>
            <li>Inventory</li>
          </Linker>
          {currentUser && (
            <Linker to={`${currentUser.role}/board`}>
              Board
              <div className="absolute -top-4 -left-2 bg-sky-500 px-[0.35rem] rounded-full text-white text-sm">
                {notification.length}
              </div>
            </Linker>
          )}
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
