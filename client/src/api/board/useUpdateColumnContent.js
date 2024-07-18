import { useState } from 'react';
import useBoardColumnList from './useBoardColumnList';

const useUpdateColumnContent = () => {
  const { boardColumnList } = useBoardColumnList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        throw new Error(data.message || 'Failed to update column title');
      }
      boardColumnList();
    } catch (error) {
      setError(error.message || 'Failed to update column title');
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, updateColumnContent };
};

export default useUpdateColumnContent;
