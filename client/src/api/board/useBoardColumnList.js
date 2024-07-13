import { useState, useMemo } from 'react';

const useBoardColumnList = () => {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const boardColumnList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/column/list');

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch columns');
      }

      const data = await response.json();
      setColumns(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch columns');
    } finally {
      setLoading(false);
    }
  };

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  return {
    loading,
    error,
    boardColumnList,
    columns,
    setColumns,
    columnsId,
  };
};

export default useBoardColumnList;
