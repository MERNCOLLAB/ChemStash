import { arrayMove } from '@dnd-kit/sortable';
import useUpdateColumnOrder from '../../api/board/useUpdateColumnOrder';

const useOnDragOver = () => {
  const { updateColumnOrder } = useUpdateColumnOrder();
  async function onDragOver(event, tasks, setTasks) {
    const { active, over } = event;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask) {
      const activeTask = tasks.find((task) => task.id === activeId);

      if (isOverATask) {
        const overTask = tasks.find((task) => task.id === overId);
        const newColumnId = overTask.columnId;
        const newOrder = overTask.order;

        setTasks((tasks) => {
          const updatedTasks = tasks.map((task) =>
            task.id === activeId ? { ...task, columnId: newColumnId, order: newOrder } : task
          );
          return arrayMove(updatedTasks, tasks.indexOf(activeTask), tasks.indexOf(overTask));
        });

        // UpdateColumnOrder Fetch
        updateColumnOrder(newColumnId, newOrder, activeId);
      } else if (isOverAColumn) {
        const newColumnId = overId;
        const tasksInNewColumn = tasks.filter((task) => task.columnId === newColumnId);
        const newOrder = tasksInNewColumn.length + 1;

        setTasks((tasks) =>
          tasks.map((task) => (task.id === activeId ? { ...task, columnId: newColumnId, order: newOrder } : task))
        );
        // UpdateColumnOrder Fetch
        updateColumnOrder(newColumnId, newOrder, activeId);
      }
    }
  }
  return { onDragOver };
};

export default useOnDragOver;
