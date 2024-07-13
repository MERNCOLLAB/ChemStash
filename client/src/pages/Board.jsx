import { useEffect, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import ColumnContainer from '../ui/ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from '../ui/TaskCard';
import { useSelector } from 'react-redux';
import useOnDragStart from '../hooks/dragevents/useOnDragStart';
import useOnDragOver from '../hooks/dragevents/useOnDragOver';
import useOnDragEnd from '../hooks/dragevents/useOnDragEnd';
import Drawer from '../ui/Drawer';
import UpdateTask from '../ui/UpdateTask';
import useBoardColumnList from '../api/board/useBoardColumnList';
import useBoardTaskList from '../api/board/useBoardTaskList';
import useBoardSocketListeners from '../hooks/useBoardSocketListeners';

function Board() {
  const { columns, setColumns, columnsId, boardColumnList } = useBoardColumnList();
  const { tasks, setTasks, boardTaskList } = useBoardTaskList();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { user, socket } = useSelector((state) => state.notification);
  const { onDragStart } = useOnDragStart();
  const { onDragOver } = useOnDragOver();
  const { onDragEnd } = useOnDragEnd(currentUser);
  const [open, setOpen] = useState(false);
  const [taskitem, setTaskItem] = useState({ id: null, content: '', dueDate: '', assignedUsers: [] });

  // Socket Operations
  useBoardSocketListeners(setColumns, setTasks);

  useEffect(() => {
    boardColumnList();
    boardTaskList();
  }, []);

  // activate delete column function
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  // create column
  const createNewColumn = async () => {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      order: columns.length + 1,
    };

    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/board/column/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(columnToAdd),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add column');
      }

      boardColumnList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to add column');
    }
  };

  // delete column
  const deleteColumn = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/board/column/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete column');
      }
      boardTaskList();
      boardColumnList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to delete column');
    }
  };

  const updateColumn = async (id, title) => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/column/updateTitle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title }),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update column title');
      }
      boardColumnList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update column title');
    }
  };

  const createTask = async (columnId, type) => {
    const columnTitle = columns.find((column) => column.id === columnId);
    const makerId = currentUser._id;
    const maker = currentUser.username;
    socket.emit('sendNotification', {
      senderName: user,
      type,
    });

    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/notification/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, makerId, maker, title: columnTitle.title }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add notification');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }

    // Filter tasks to find those that belong to the specified columnId
    const tasksInColumn = tasks.filter((task) => task.columnId === columnId);

    // Determine the order number for the new task
    const newOrder = tasksInColumn.length > 0 ? Math.max(...tasksInColumn.map((task) => task.order)) + 1 : 1;

    const newTask = {
      id: generateId(),
      columnId,
      username: maker,
      content: `Task ${tasks.length + 1}`,
      order: newOrder,
    };

    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/board/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add task');
      }

      boardTaskList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to add task');
    }
  };

  // function deleteTask(taskId) {
  //   const filteredTask = tasks.filter((task) => task.id !== taskId);
  //   setTasks(filteredTask);
  // }

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/board/task/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete column');
      }

      boardTaskList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to delete column');
    }
  };

  // Update task function

  // function updateTask(taskId, content) {
  //   const updateTask = tasks.map((task) => {
  //     if (task.id !== taskId) return task;
  //     return { ...task, content };
  //   });
  //   setTasks(updateTask);
  // }

  const updateTask = async (taskId, content, dueDate, assignedUsers) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/board/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, dueDate, assignedUsers }),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task');
      }

      boardTaskList();

      setOpen(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update task');
    }
  };

  const openTask = (task) => {
    setOpen((prev) => !prev);

    setTaskItem(task);
  };
  const close = () => {
    setOpen(false);
  };

  const handleUpdate = (id, update, date, selectedMembers) => {
    updateTask(id, update, date, selectedMembers);
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
                    updateColumn={updateColumn}
                    createTask={createTask}
                    openTask={openTask}
                    open={open}
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
                  updateColumn={updateColumn}
                  createTask={createTask}
                  currentUser={currentUser}
                  deleteTask={deleteTask}
                  openTask={openTask}
                  open={open}
                  tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                />
              )}
              {activeTask && <TaskCard task={activeTask} updateTask={updateTask} deleteTask={deleteTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
      <Drawer isOpen={open} onClose={close}>
        <UpdateTask taskitem={taskitem} onUpdate={handleUpdate} />
      </Drawer>
    </>
  );
}

function generateId() {
  return Math.floor(Math.random() * 100001);
}

export default Board;
