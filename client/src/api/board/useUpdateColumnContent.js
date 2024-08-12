import { useState } from 'react';
import useBoardColumnList from './useBoardColumnList';

const useUpdateColumnContent = () => {
  const { boardColumnList } = useBoardColumnList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const updateColumnContent = async (id, title, color) => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/column/updateColumnContent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, color }),
      });
      const data = await response.json();

      if (!response.ok) {
        setToastMessage('Failed to update the selected column');
        setToastType('error');
        throw new Error(data.message || 'Failed to update column title');
      }

      boardColumnList();
      setToastMessage('Board Column has been updated');
      setToastType('success');
    } catch (error) {
      setError(error.message || 'Failed to update column title');
    } finally {
      setLoading(false);
    }
  };

  const clearToast = () => {
    setToastMessage(null);
    setToastType(null);
  };
  return { loading, error, updateColumnContent, toastType, toastMessage, clearToast };
};

export default useUpdateColumnContent;
