import { useState } from 'react';
import useBoardTaskList from '../board/useBoardTaskList';

const useUpdateTask = () => {
  const { boardTaskList } = useBoardTaskList();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const updateTask = async (taskId, content, dueDate, assignedUsers, priority, desc) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/board/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, dueDate, assignedUsers, priority, desc }),
      });
      const data = await response.json();

      setLoading(false);
      if(data.success === false){
        setToastMessage('Failed to update the task');
        setToastType('error');
        return;
      }

      boardTaskList();
      setToastMessage('Task has been updated');
      setToastType('success');
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update task');
    }
  };

  const clearToast = () =>{
    setToastMessage(null);
    setToastType(null);
  }
  return { loading, error, updateTask, toastMessage, toastType, clearToast };
};

export default useUpdateTask;
