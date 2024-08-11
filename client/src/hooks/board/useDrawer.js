import { useState } from 'react';

const useDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [taskItem, setTaskItem] = useState({ id: null, content: '', dueDate: '', assignedUsers: [] });
  const [columnItem, setColumnItem] = useState({
    id: null,
    color: '',
    title: '',
  });
  const [drawerType, setDrawerType] = useState('');

  const openTask = (task) => {
    handleDrawerOpen('updateTask');
    setTaskItem(task);
  };

  const handleDeleteTask = (task) => {
    handleDrawerOpen('deleteTask');
    setTaskItem(task);
  };

  const openColumn = (column) => {
    handleDrawerOpen('updateColumn');
    setColumnItem(column);
  };

  const handleDrawerOpen = (type) => {
    setDrawerType(type);
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setTaskItem({ id: null, content: '', dueDate: '', assignedUsers: [] });
    setColumnItem({
      id: null,
      color: '',
      title: '',
    });
  };

  return {
    openDrawer,
    setOpenDrawer,
    taskItem,
    openTask,
    openColumn,
    handleDeleteTask,
    columnItem,
    handleDrawerClose,
    drawerType,
  };
};

export default useDrawer;
