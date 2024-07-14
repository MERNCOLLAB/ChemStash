import { useEffect, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import ColumnContainer from '../ui/ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from '../ui/TaskCard';
import { useSelector } from 'react-redux';

// Drag Events
import useOnDragStart from '../hooks/dragevents/useOnDragStart';
import useOnDragOver from '../hooks/dragevents/useOnDragOver';
import useOnDragEnd from '../hooks/dragevents/useOnDragEnd';

// UI
import Drawer from '../ui/Drawer';
import UpdateTask from '../ui/UpdateTask';

// Column Hooks
import useBoardColumnList from '../api/board/useBoardColumnList';
import useBoardTaskList from '../api/board/useBoardTaskList';
import useBoardSocketListeners from '../hooks/board/useBoardSocketListeners';
import useCreateNewColumn from '../api/board/useCreateNewColumn';
import useDeleteColumn from '../api/board/useDeleteColumn';
import useUpdateColumnTitle from '../api/board/useUpdateColumnTitle';

// Task Hooks
import useCreateTask from '../api/task/useCreateTask';
import useUpdateTask from '../api/task/useUpdateTask';
import useDeleteTask from '../api/task/useDeleteTask';
import useDrawer from '../hooks/board/useDrawer';

function Board() {
  const { columns, setColumns, columnsId, boardColumnList } = useBoardColumnList();
  const { tasks, setTasks, boardTaskList } = useBoardTaskList();
  const { openDrawer, taskItem, openTask, handleDrawerClose } = useDrawer();

  // Column
  const { createNewColumn } = useCreateNewColumn(columns);
  const { deleteColumn } = useDeleteColumn();
  const { updateColumnTitle } = useUpdateColumnTitle();
  const [activeColumn, setActiveColumn] = useState(null);

  // Tasks
  const { createTask } = useCreateTask();
  const { updateTask } = useUpdateTask();
  const { deleteTask } = useDeleteTask();
  const [activeTask, setActiveTask] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  // Drag Events
  const { onDragStart } = useOnDragStart();
  const { onDragOver } = useOnDragOver();
  const { onDragEnd } = useOnDragEnd(currentUser);

  // Socket Operations
  useBoardSocketListeners(setColumns, setTasks);

  useEffect(() => {
    boardColumnList();
    boardTaskList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDrawer]);

  // activate delete column function
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleUpdate = (id, update, date, selectedMembers, priority) => {
    updateTask(id, update, date, selectedMembers, priority);
  };

  return (
    <>
      <div className="border p-2 flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden ">
        <DndContext
          sensors={sensors}
          onDragStart={(event) => onDragStart(event, setActiveColumn, setActiveTask)}
          onDragEnd={(event) => onDragEnd(event, columns, setColumns, setActiveColumn, tasks, setTasks, setActiveTask)}
          onDragOver={(event) => onDragOver(event, tasks, setTasks)}
        >
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    currentUser={currentUser}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumnTitle}
                    createTask={createTask}
                    openTask={openTask}
                    open={openDrawer}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    deleteTask={deleteTask}
                  />
                ))}
              </SortableContext>
            </div>
            {currentUser.role === 'chemist' ? null : (
              <button
                className=" p-2 flex gap-2 border border-transparent hover:border-white h-fit"
                onClick={() => {
                  createNewColumn();
                }}
              >
                <PlusIcon /> Add Column
              </button>
            )}
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumnTitle}
                  createTask={createTask}
                  currentUser={currentUser}
                  deleteTask={deleteTask}
                  openTask={openTask}
                  open={openDrawer}
                  tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                />
              )}
              {activeTask && <TaskCard task={activeTask} updateTask={updateTask} deleteTask={deleteTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
      <Drawer isOpen={openDrawer} onClose={handleDrawerClose}>
        <UpdateTask taskitem={taskItem} onUpdate={handleUpdate} />
      </Drawer>
    </>
  );
}

export default Board;
