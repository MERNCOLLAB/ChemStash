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

  const openColumn = (columnItem) => {
    handleDrawerOpen('updateColumn');
    setColumnItem(columnItem);
  };

  const handleDeleteColumn = (columnItem) => {
    handleDrawerOpen('deleteColumn');
    setColumnItem(columnItem);
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
    handleDeleteTask,
    openColumn,
    handleDeleteColumn,
    columnItem,
    handleDrawerClose,
    drawerType,
  };
};

export default useDrawer;
