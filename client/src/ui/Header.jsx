import { useSelector } from 'react-redux';
import { Linker } from '../components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/notification/notificationSlice';
import NotificationList from './NotificationList';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { socket, user } = useSelector((state) => state.notification);
  const [notification, setNotification] = useState([]);
  const username = currentUser?.username;

  const dispatch = useDispatch();
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
    if (currentUser) {
      dispatch(setUser({ user: currentUser.username }));
    }
    socket?.emit('newUser', user);
    socket?.on('getNotification', (data) => {
      if (data.senderName !== username) {
        setNotification((prev) => [...prev, data]);
      }
    });
  }, [socket, currentUser]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = 'created a task';
    } else if (type === 2) {
      action = 'deleted a task';
    } else {
      action = 'moved a task';
    }
    return <p>{`${senderName} ${action}`}</p>;
  };

  return (
    <div className="mx-auto border relative">
      <div className="flex justify-between items-center mx-auto p-3">
        <Linker to="/">
          <h1 className="font-bold">Chemstack</h1>
        </Linker>
        <NotificationList userId={currentUser?._id} />
        <ul className="flex gap-4 items-center">
          <Linker to="/dashboard">
            <li>Dashboard</li>
          </Linker>
          <Linker to={`${currentUser?.role}/inventory`}>
            <li>Inventory</li>
          </Linker>
          {currentUser && <Linker to={`${currentUser.role}/board`}>Board</Linker>}

          <div className="relative cursor-pointer">
            Notification
            <div className="absolute -top-4 -left-2 bg-sky-500 px-[0.35rem] rounded-full text-white text-sm">
              {notification.length}
            </div>
          </div>

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
      <div className=" absolute flex flex-col gap-2  z-50 right-16 pr-4 pl-2 border top-12 bg-columnBackGroundColor">
        {notification.map((n, index) => (
          <div key={index}>{displayNotification(n)}</div>
        ))}
      </div>
    </div>
  );
}

export default Header;
