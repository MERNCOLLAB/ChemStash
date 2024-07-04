import { useEffect, useState } from 'react';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`/api/notification/view/${userId}`, {
          method: 'GET',
        });
        const data = await response.json();

        setLoading(false);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setNotifications(data);
      } catch (error) {
        console.error('Error:', error);
        setError(true);
      }
    };

    fetchNotifications();
  }, [userId]);

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
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="relative">
      <small className="absolute -left-1 -top-2 bg-sky-500 px-[.35rem] rounded-full  font-semibold">
        {unseenCount}
      </small>
      <details className="dropdown  dropdown-end relative">
        <summary className="btn  border-none p-0" onClick={markAllAsSeen}>
          Notification
        </summary>
        <ul className="menu dropdown-content bg-columnBackGroundColor  z-[1] w-52 p-2 shadow border ">
          {notifications.map((feed) => (
            <li key={feed._id} className="cursor-pointer hover:bg-mainBackGroundColor p-1">
              {feed.notification.text} {feed.notification.maker}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default NotificationList;
