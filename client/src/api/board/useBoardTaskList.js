import { useState } from 'react';

const useBoardTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const boardTaskList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/task/list');

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, boardTaskList, tasks, setTasks };
};

export default useBoardTaskList;
