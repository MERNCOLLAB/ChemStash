import { useState } from 'react';
import useBoardTaskList from '../board/useBoardTaskList';
import toast from 'react-hot-toast';
import useDrawer from '../../hooks/board/useDrawer';

const useUpdateTask = () => {
  const { setOpenDrawer } = useDrawer();
  const { boardTaskList } = useBoardTaskList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateTask = async (taskId, content, dueDate, assignedUsers, priority) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/board/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, dueDate, assignedUsers, priority }),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task');
      }

      boardTaskList();
      toast.success('Task has been updated');
      setOpenDrawer(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update task');
    }
  };
  return { loading, error, updateTask };
};

export default useUpdateTask;
