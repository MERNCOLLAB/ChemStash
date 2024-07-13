import { useState } from 'react';

const useDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [taskItem, setTaskItem] = useState({ id: null, content: '', dueDate: '', assignedUsers: [] });

  const openTask = (task) => {
    setOpenDrawer((prev) => !prev);
    setTaskItem(task);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return {
    openDrawer,
    setOpenDrawer,
    taskItem,
    openTask,
    handleDrawerClose,
  };
};

export default useDrawer;
