import { useState } from 'react';
import useBoardTaskList from '../board/useBoardTaskList';

const useDeleteTask = () => {
  const { boardTaskList } = useBoardTaskList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/board/task/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if(data.success === false){
        setToastMessage('Failed to delete the selected task');
        setToastType('error');
      }

      boardTaskList();
      setToastMessage('Task has been deleted');
      setToastType('success');
    } catch (error) {
      setError(true);
      setError(error.message || 'Failed to delete the task');
    } finally {
      setLoading(false);
    }
  };

  const clearToast = () =>{
    setToastMessage(null);
    setToastType(null);
  }

  return { loading, error, deleteTask, toastType, toastMessage, clearToast };
};

export default useDeleteTask;
