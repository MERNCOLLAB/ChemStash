import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useBoardSocketListeners = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { user, socket } = useSelector((state) => state.notification);

  useEffect(() => {
    socket?.on('columnAdded', (newColumn) => {
      setColumns((prevColumns) => [...prevColumns, newColumn]);
    });

    socket?.on('columnDeleted', (deletedColumn) => {
      setColumns((prevColumns) => prevColumns.filter((col) => col.id !== deletedColumn.id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.columnId !== deletedColumn.id));
    });
    socket?.on('columnOrderUpdated', (updatedColumns) => {
      setColumns(updatedColumns);
    });

    socket?.on('columnTitleUpdated', (updatedColumn) => {
      setColumns((prevColumns) => prevColumns.map((col) => (col.id === updatedColumn.id ? updatedColumn : col)));
    });

    socket?.on('createTask', (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
    socket?.on('taskDeleted', (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId.id));
    });
    socket?.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    });
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return { columns, setColumns, tasks, setTasks, user };
};

export default useBoardSocketListeners;
