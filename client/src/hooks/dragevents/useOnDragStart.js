const useOnDragStart = () => {
  function onDragStart(event, setActiveColumn, setActiveTask) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  }
  return { onDragStart };
};

export default useOnDragStart;
