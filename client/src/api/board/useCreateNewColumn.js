import { useState } from 'react';
import generateId from '../../helpers/GenerateId';
import useBoardColumnList from './useBoardColumnList';

const useCreateNewColumn = (columns) => {
  const { boardColumnList } = useBoardColumnList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const createNewColumn = async () => {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      order: columns.length + 1,
    };

    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/board/column/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(columnToAdd),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add column');
      }

      boardColumnList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to add column');
    }
  };

  return { loading, error, createNewColumn };
};

export default useCreateNewColumn;
