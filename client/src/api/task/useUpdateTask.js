import { useState } from 'react';
import useBoardTaskList from '../board/useBoardTaskList';
import toast from 'react-hot-toast';

const useUpdateTask = (setOpen) => {
  const { boardTaskList } = useBoardTaskList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateTask = async (taskId, content, dueDate, assignedUsers) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/board/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, dueDate, assignedUsers }),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task');
      }

      boardTaskList();
      toast.success('Task has been updated');
      setOpen(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update task');
    }
  };
  return { loading, error, updateTask };
};

export default useUpdateTask;
