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

  const handleConsume = (id) => {
    handleDrawerOpen('consume');
    const itemToConsume = lists.find((item) => item._id === id);
    setCurrentItem(itemToConsume);
  };
  const handleAdd = () => {
    handleDrawerOpen('add');
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
    handleConsume,
    handleAdd,
  };
};

export default useDrawer;
