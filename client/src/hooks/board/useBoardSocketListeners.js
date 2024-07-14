import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useBoardSocketListeners = (setColumns, setTasks) => {
  const { socket } = useSelector((state) => state.notification);

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
      socket.off('columnAdded');
      socket.off('columnDeleted');
      socket.off('columnOrderUpdated');
      socket.off('columnTitleUpdated');
      socket.off('createTask');
      socket.off('taskDeleted');
      socket.off('taskUpdated');
    };
  }, [socket, setColumns, setTasks]);
};

export default useBoardSocketListeners;
