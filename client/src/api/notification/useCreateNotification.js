import { useState } from 'react';

const useCreateNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createNotification = async (type, makerId, maker, currentColumn) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/notification/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, makerId, maker, title: currentColumn.title }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add notification');
      }
    } catch (error) {
      setError(true);
      console.error('Notification failed to be created', error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, createNotification };
};

export default useCreateNotification;
