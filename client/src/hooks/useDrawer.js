import { useState } from 'react';

const useDrawer = (lists) => {
  const [currentItem, setCurrentItem] = useState({});
  const [drawerType, setDrawerType] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleUpdate = (id) => {
    handleDrawerOpen('update');
    const itemToUpdate = lists.find((item) => item._id === id);
    setCurrentItem(itemToUpdate);
  };
  const handleDelete = (id) => {
    handleDrawerOpen('delete');
    const itemToDelete = lists.find((item) => item._id === id);
    setCurrentItem(itemToDelete);
  };

  const handleDrawerOpen = (type) => {
    setDrawerType(type);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setCurrentItem({});
  };

  return {
    currentItem,
    drawerType,
    drawerOpen,
    handleUpdate,
    handleDelete,
    handleDrawerOpen,
    handleDrawerClose,
  };
};

export default useDrawer;
