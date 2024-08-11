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
import { UpdateTask, DeleteTask } from '../ui';

// Column Hooks
import useBoardColumnList from '../api/board/useBoardColumnList';
import useBoardTaskList from '../api/board/useBoardTaskList';
import useBoardSocketListeners from '../hooks/board/useBoardSocketListeners';
import useCreateNewColumn from '../api/board/useCreateNewColumn';
import useDeleteColumn from '../api/board/useDeleteColumn';
import useUpdateColumnContent from '../api/board/useUpdateColumnContent';

// Task Hooks
import useCreateTask from '../api/task/useCreateTask';
import useDrawer from '../hooks/board/useDrawer';
import ToastProvider from '../configs/ToastProvider';
import UpdateColumn from '../ui/UpdateColumn';

function Board() {
  const { columns, setColumns, columnsId, boardColumnList } = useBoardColumnList();
  const { tasks, setTasks, boardTaskList } = useBoardTaskList();
  const { openDrawer, taskItem, openTask, handleDrawerClose, handleDeleteTask, drawerType, columnItem, openColumn } =
    useDrawer();

  // Column
  const { createNewColumn } = useCreateNewColumn(columns);
  const { deleteColumn } = useDeleteColumn();
  const { updateColumnContent } = useUpdateColumnContent();
  const [activeColumn, setActiveColumn] = useState(null);

  // Tasks
  const { createTask, toastMessage, toastType, clearToast } = useCreateTask();
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

  return (
    <>
      <div className="border p-2  min-h-[calc(100vh-88px)]  overflow-x-auto overflow-y-hidden ">
        {/* <h1 className="font-semibold">Board Task Assignment and Planner</h1> */}
        <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast} />
        <DndContext
          sensors={sensors}
          onDragStart={(event) => onDragStart(event, setActiveColumn, setActiveTask)}
          onDragEnd={(event) => onDragEnd(event, columns, setColumns, setActiveColumn, tasks, setTasks, setActiveTask)}
          onDragOver={(event) => onDragOver(event, tasks, setTasks)}
        >
          <div className=" flex gap-4    ">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    openDrawer={openDrawer}
                    currentUser={currentUser}
                    deleteColumn={deleteColumn}
                    createTask={createTask}
                    openColumn={openColumn}
                    openTask={openTask}
                    open={openDrawer}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    handleDeleteTask={handleDeleteTask}
                  />
                ))}
              </SortableContext>
            </div>
            {currentUser.role === 'chemist' ? null : (
              <div className="shadow-lg  bg-white1 rounded-lg h-[40px] w-[300px] min-w-[300px] flex items-center ">
                <button
                  className=" gap-2   font-semibold     flex  px-2 "
                  onClick={() => {
                    createNewColumn();
                  }}
                >
                  <PlusIcon />
                  Add Column
                </button>
              </div>
            )}
            <div className="w-[24px] min-w-[24px] h-full border  border-transparent   block"></div>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  currentUser={currentUser}
                  handleDeleteTask={handleDeleteTask}
                  openColumn={openColumn}
                  openTask={openTask}
                  open={openDrawer}
                  tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                />
              )}
              {activeTask && <TaskCard task={activeTask} handleDeleteTask={handleDeleteTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
      <Drawer isOpen={openDrawer} onClose={handleDrawerClose}>
        {drawerType === 'deleteTask' && <DeleteTask taskitem={taskItem} handleDrawerClose={handleDrawerClose} />}
        {drawerType === 'updateTask' && <UpdateTask taskitem={taskItem} handleDrawerClose={handleDrawerClose} />}
        {drawerType === 'updateColumn' && (
          <UpdateColumn
            columnItem={columnItem}
            updateColumn={updateColumnContent}
            handleDrawerClose={handleDrawerClose}
          />
        )}
      </Drawer>
    </>
  );
}

export default Board;
