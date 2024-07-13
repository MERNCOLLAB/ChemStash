import { useState } from 'react';
import useBoardColumnList from './useBoardColumnList';

const useUpdateColumnTitle = () => {
  const { boardColumnList } = useBoardColumnList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateColumnTitle = async (id, title) => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/column/updateTitle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update column title');
      }
      boardColumnList();
    } catch (error) {
      setError(error.message || 'Failed to update column title');
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, updateColumnTitle };
};

export default useUpdateColumnTitle;
