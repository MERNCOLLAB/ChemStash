import { useSelector, useDispatch } from 'react-redux';
import { Linker } from '../components';
import { useEffect } from 'react';
import { setUser } from '../redux/notification/notificationSlice';
import NotificationList from './NotificationList';
import Logo from '../assets/test.png';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { socket, user } = useSelector((state) => state.notification);
  const username = currentUser?.username;

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(setUser({ user: currentUser.username }));
    }
    socket?.emit('newUser', user);
  }, [socket, currentUser, user, dispatch, username]);

  const getProfileLink = () => {
    if (!currentUser) return '/sign-in';
    switch (currentUser.role) {
      case 'manager':
        return '/manager/profile';
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

  return (
    <div className="mx-auto border bg-white0">
      <div className="flex justify-between items-end mx-auto px-7 py-5">
        <div className="flex gap-1 items-center">
          <Linker to="/">
            <img src={Logo} className="h-10" alt="app-logo" />
          </Linker>
          <h1 className="font-semibold text-md">ChemStack</h1>
        </div>

        <ul className="flex gap-4 items-end">
          <p>Welcome <span  className="underline">{currentUser.username}</span></p>
          {currentUser && <NotificationList userId={currentUser?._id} />}
          <div>
            <Linker to={getProfileLink()}>
              {currentUser ? (
                <img
                  className="border rounded-full h-10 w-10 object-cover border-white shadow-lg"
                  src={currentUser.profilePicture}
                  alt="Profile"
                />
              ) : (
                <li>Sign In</li>
              )}
            </Linker>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;
