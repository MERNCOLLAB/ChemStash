import { useState } from 'react';
import useBoardTaskList from '../board/useBoardTaskList';
import toast from 'react-hot-toast';
const useDeleteTask = () => {
  const { boardTaskList } = useBoardTaskList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/board/task/delete/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete the task');
      }
      const data = await res.json();

      toast.success('A task has been deleted');
      boardTaskList();
    } catch (error) {
      setError(true);
      setError(error.message || 'Failed to delete the task');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteTask };
};

export default useDeleteTask;
