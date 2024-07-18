import { useState, useEffect } from 'react';
import generateId from '../../helpers/GenerateId';
import useBoardColumnList from '../board/useBoardColumnList';
import { useSelector } from 'react-redux';
import useBoardTaskList from '../board/useBoardTaskList';
import useCreateNotification from '../notification/useCreateNotification';


const useCreateTask = () => {
  // External States
  const { columns, boardColumnList } = useBoardColumnList();
  const { createNotification } = useCreateNotification();
  const { tasks, boardTaskList } = useBoardTaskList();
  const { user, socket } = useSelector((state) => state.notification);
  const { currentUser } = useSelector((state) => state.user);
  // Local States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  useEffect(() => {
    boardColumnList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const createTask = async (columnId, type) => {
    const currentColumn = columns.find((column) => column.id === columnId);

    const makerId = currentUser._id;
    const maker = currentUser.username;
    socket.emit('sendNotification', {
      senderName: user,
      type,
    });

    createNotification(type, makerId, maker, currentColumn);

    // Filter tasks to find those that belong to the specified columnId
    const tasksInColumn = tasks.filter((task) => task.columnId === columnId);

    // Determine the order number for the new task
    const newOrder = tasksInColumn.length > 0 ? Math.max(...tasksInColumn.map((task) => task.order)) + 1 : 1;

    const newTask = {
      id: generateId(),
      columnId,
      username: maker,
      content: `Task ${tasks.length + 1}`,
      order: newOrder,
    };

    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/board/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (!response.ok) {
        setToastMessage('Failed to create a task');
        setToastType('error');
        throw new Error(data.message );
      }

      boardTaskList();
      setToastMessage('A Task has been created');
      setToastType('success');
    } catch (error) {
      setError(true);
      setToastMessage('Failed to create a task');
      setToastType('error');
      setError(error.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };
  const clearToast = () =>{
    setToastMessage(null);
    setToastType(null);
  }

  return { loading, error, createTask, toastMessage, toastType, clearToast };
};

export default useCreateTask;
