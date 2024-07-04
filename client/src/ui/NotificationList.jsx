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

  return (
    <ul>
      {notifications.map((feed) => (
        <li key={feed._id}>{feed.notification.text}</li>
      ))}
    </ul>
  );
};

export default NotificationList;
