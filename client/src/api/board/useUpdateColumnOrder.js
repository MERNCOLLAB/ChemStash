const useUpdateColumnOrder = () => {
  const updateColumnOrder = async (newColumnId, newOrder, activeId) => {
    try {
      await fetch(`/api/board/task/updateColumnAndOrder/${activeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columnId: newColumnId, order: newOrder }),
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  return { updateColumnOrder };
};

export default useUpdateColumnOrder;
