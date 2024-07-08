const useUpdateOrder = () => {
  const updateOrder = async (updatedColumns, setColumns) => {
    try {
      const response = await fetch('/api/board/column/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedColumns),
      });

      if (!response.ok) {
        throw new Error('Failed to update columns order');
      }

      setColumns(updatedColumns);
    } catch (error) {
      console.error('Error updating columns order:', error);
    }
  };
  return { updateOrder };
};

export default useUpdateOrder;
