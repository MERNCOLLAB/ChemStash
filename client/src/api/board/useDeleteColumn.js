import { useState } from 'react';
import useBoardColumnList from './useBoardColumnList';
import useBoardTaskList from './useBoardTaskList';

const useDeleteColumn = () => {
  const { boardColumnList } = useBoardColumnList();
  const { boardTaskList } = useBoardTaskList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const deleteColumn = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/board/column/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete column');
      }
      boardTaskList();
      boardColumnList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to delete column');
    }
  };
  return { loading, error, deleteColumn };
};

export default useDeleteColumn;
