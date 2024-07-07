import { useState } from 'react';
import useBoardSocketListeners from '../hooks/useBoardSocketListeners';

const useFetchTaskList = () => {
  const { setTasks } = useBoardSocketListeners();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchTaskList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/task/list');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tasks');
      }

      setTasks(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, fetchTaskList };
};

export default useFetchTaskList;
