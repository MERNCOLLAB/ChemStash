import { useState } from 'react';
import useBoardSocketListeners from '../hooks/useBoardSocketListeners';

const useFetchColumnList = () => {
  const { setColumns } = useBoardSocketListeners();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchColumnList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/column/list');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch columns');
      }
      setColumns(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch columns');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchColumnList };
};

export default useFetchColumnList;
