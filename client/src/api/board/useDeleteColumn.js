import { useState } from 'react';
import useBoardColumnList from './useBoardColumnList';
import useBoardTaskList from './useBoardTaskList';

const useDeleteColumn = () => {
  const { boardColumnList } = useBoardColumnList();
  const { boardTaskList } = useBoardTaskList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const deleteColumn = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/board/column/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        setToastMessage('Failed to delete the column');
        setToastType('error');
        throw new Error(data.message || 'Failed to delete column');
      }

      const data = await res.json();

      boardTaskList();
      boardColumnList();
      setToastMessage('Column has been deleted');
      setToastType('success');
    } catch (error) {
      setError(error.message || 'Failed to delete column');
    } finally {
      setLoading(false);
    }
  };

  const clearToast = () => {
    setToastMessage(null);
    setToastType(null);
  };
  return { loading, error, deleteColumn, toastMessage, toastType, clearToast };
};

export default useDeleteColumn;
