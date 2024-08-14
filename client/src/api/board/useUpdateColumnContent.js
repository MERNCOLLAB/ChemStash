import { useState } from 'react';
import useBoardColumnList from './useBoardColumnList';

const useUpdateColumnContent = () => {
  const { boardColumnList } = useBoardColumnList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
        throw new Error(data.message || 'Failed to update column content');
      }

      await boardColumnList();
      setToastMessage('Board Column has been updated');
      setToastType('success');
    } catch (error) {
      setError(error.message || 'Failed to update column content');
      setToastMessage('Failed to update the board column content');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  const clearToast = () => {
    setToastMessage(null);
    setToastType(null);
  };
  return { loading, error, updateColumnContent, toastMessage, toastType, clearToast };
};

export default useUpdateColumnContent;
