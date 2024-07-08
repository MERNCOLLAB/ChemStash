import { arrayMove } from '@dnd-kit/sortable';
import useUpdateOrder from '../../api/board/useUpdateOrder';
import useUpdateColumnOrder from '../../api/board/useUpdateColumnOrder';

const useOnDragEnd = (currentUser) => {
  const { updateOrder } = useUpdateOrder();
  const { updateColumnOrder } = useUpdateColumnOrder();
  async function onDragEnd(event, columns, setColumns, setActiveColumn, tasks, setTasks, setActiveTask) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    const isActiveATask = active.data.current?.type === 'Task';

    if (isActiveAColumn) {
      // Handle column drag logic here
      if (currentUser.role === 'chemist') return;
      const activeIndex = columns.findIndex((col) => col.id === activeId);
      const overIndex = columns.findIndex((col) => col.id === overId);

      if (activeIndex === -1 || overIndex === -1) return;

      const updatedColumns = arrayMove([...columns], activeIndex, overIndex).map((col, index) => ({
        ...col,
        order: index,
      }));

      updateOrder(updatedColumns, setColumns);
      return;
    }
    if (isActiveATask) {
      const activeTask = tasks.find((task) => task.id === activeId);
      const overTask = tasks.find((task) => task.id === overId);

      if (overTask && activeTask.columnId !== overTask.columnId) {
        // Task is moved to a different column
        const newColumnId = overTask.columnId;
        const tasksInNewColumn = tasks.filter((task) => task.columnId === newColumnId);
        const newOrder = tasksInNewColumn.length + 1;

        setTasks((prevTasks) => {
          const updatedTasks = [
            ...prevTasks.filter((task) => task.id !== activeId),
            {
              ...activeTask,
              columnId: newColumnId,
              order: newOrder,
            },
          ].map((task, index) => ({
            ...task,
            order: task.columnId === newColumnId ? index + 1 : task.order,
          }));

          return updatedTasks;
        });

        updateColumnOrder(newColumnId, newOrder, activeId);
      } else if (overTask && activeTask.columnId === overTask.columnId) {
        // Task is reordered within the same column
        const newOrder = overTask.order;

        setTasks((prevTasks) => {
          const updatedTasks = arrayMove(
            [...prevTasks],
            prevTasks.indexOf(activeTask),
            prevTasks.indexOf(overTask)
          ).map((task, index) => ({
            ...task,
            order: task.columnId === activeTask.columnId ? index + 1 : task.order,
          }));

          return updatedTasks;
        });

        updateColumnOrder(activeTask.columnId, newOrder, activeId);
      } else {
        // Handle the scenario when overTask is undefined (dropped in empty space within the same column)
        // You can add any specific logic or handling here, if needed
        return;
      }
    }
  }

  return { onDragEnd };
};

export default useOnDragEnd;
