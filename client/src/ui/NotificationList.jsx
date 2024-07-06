import { useEffect, useState } from 'react';
import NotificationLayout from './NotificationLayout';
import { useSelector } from 'react-redux';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const unseenCount = notifications.filter((notification) => !notification.isSeen).length;
  const sortedNotifications = [...notifications].sort((a, b) => {
    return new Date(b.notification.createdAt) - new Date(a.notification.createdAt);
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="relative">
      {unseenCount >= 1 ? (
        <small className="absolute -left-1 -top-2 bg-sky-500 px-[.35rem] rounded-full font-semibold">
          {unseenCount}
        </small>
      ) : null}

      <details className="dropdown dropdown-end relative">
        <summary className="btn border-none p-0" onClick={markAllAsSeen}>
          Notification
        </summary>
        <ul className="menu dropdown-content bg-columnBackGroundColor z-[1] min-w-[320px] w-full p-2 shadow border">
          {sortedNotifications.map((feed) => (
            <li key={feed._id} className="cursor-pointer hover:bg-mainBackGroundColor w-full">
              <NotificationLayout
                maker={feed.notification.maker}
                text={feed.notification.text}
                title={feed.notification.title}
              />
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default NotificationList;
