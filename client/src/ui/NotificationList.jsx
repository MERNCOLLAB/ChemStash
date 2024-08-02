import { useEffect, useState } from 'react';
import NotificationLayout from './NotificationLayout';

import { useSelector } from 'react-redux';
import { IoNotificationsOutline } from 'react-icons/io5';
const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { socket } = useSelector((state) => state.notification);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`/api/notification/view/${userId}`, {
          method: 'GET',
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setNotifications(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchNotifications();

    const handleNewNotification = () => {
      fetchNotifications();
    };

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('joinRoom', userId);
    });

    socket.on('newNotification', handleNewNotification);

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('newNotification', handleNewNotification);
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket, userId]);

  const markAllAsSeen = async () => {
    const unseenNotifications = notifications.filter((notification) => !notification.isSeen);
    if (unseenNotifications.length === 0) {
      return;
    }

    try {
      await fetch(`/api/notification/seen/${userId}`, {
        method: 'PATCH',
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isSeen: true,
        }))
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNotificationClick = () => {
    setIsDropdownOpen(false);
  };

  const unseenCount = notifications.filter((notification) => !notification.isSeen).length;
  const sortedNotifications = [...notifications].sort((a, b) => {
    return new Date(b.notification.createdAt) - new Date(a.notification.createdAt);
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="dropdown dropdown-bottom dropdown-end relative" onBlur={() => setIsDropdownOpen(false)}>
      {unseenCount >= 1 ? (
        <small className="absolute -left-1 -top-2 bg-sky-500 px-[.35rem] rounded-full font-semibold">
          {unseenCount}
        </small>
      ) : null}

      <div
        tabIndex={0}
        role="button"
        onClick={() => {
          if (sortedNotifications.length === 0) {
            setIsDropdownOpen(false);
          } else {
            setIsDropdownOpen(!isDropdownOpen);
            markAllAsSeen();
          }
        }}
      >
        <IoNotificationsOutline size={24} color="#64748B" />
      </div>

      {isDropdownOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-gray0 rounded-md z-[1] min-w-[320px] w-full p-2 shadow-sm shadow-slate-500 border"
        >
          {sortedNotifications.map((feed) => (
            <li
              key={feed._id}
              className="cursor-pointer hover:bg-slate-100 rounded-md w-full text-sm"
              onClick={handleNotificationClick}
            >
              <NotificationLayout
                maker={feed.notification.maker}
                text={feed.notification.text}
                title={feed.notification.title}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
