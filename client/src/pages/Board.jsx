import { useEffect, useMemo, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import ColumnContainer from '../ui/ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from '../ui/TaskCard';
import io from 'socket.io-client';

function Board() {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('columnAdded', (newColumn) => {
      setColumns((prevColumns) => [...prevColumns, newColumn]);
    });

    socket.on('columnDeleted', (deletedColumn) => {
      setColumns((prevColumns) => prevColumns.filter((col) => col.id !== deletedColumn.id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.columnId !== deletedColumn.id));
    });
    socket.on('columnOrderUpdated', (updatedColumns) => {
      setColumns(updatedColumns);
    });

    socket.on('columnTitleUpdated', (updatedColumn) => {
      setColumns((prevColumns) => prevColumns.map((col) => (col.id === updatedColumn.id ? updatedColumn : col)));
    });

    socket.on('createTask', (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
    socket.on('taskDeleted', (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId.id));
    });
    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // activate delete column function
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
  const fetchColumnList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/column/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch columns');
      }

      setColumns(data);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to fetch columns');
    }
  };

  const fetchTaskList = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/board/task/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tasks');
      }

      setTasks(data);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchColumnList();
    fetchTaskList();
  }, []);
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

      fetchColumnList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to add column');
    }
  };

  // function deleteColumn(id) {

  //   const newTasks = columns.filter((col) => col.id !== id);
  //   setColumns(newTasks);

  //   const deleteTask = tasks.filter((task) => task.id !== id);
  //   setTasks(deleteTask);
  // }

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
      fetchTaskList();
      fetchColumnList();
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
      fetchColumnList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update column title');
    }
  };

  // create Task

  // function createTask(columnId) {
  //   const newTask = {
  //     id: generateId(),
  //     columnId,
  //     content: `Task ${tasks.length + 1}`,
  //   };

  //   setTasks([...tasks, newTask]);
  // }
  const createTask = async (columnId) => {
    // Filter tasks to find those that belong to the specified columnId
    const tasksInColumn = tasks.filter((task) => task.columnId === columnId);

    // Determine the order number for the new task
    const newOrder = tasksInColumn.length > 0 ? Math.max(...tasksInColumn.map((task) => task.order)) + 1 : 1;

    const newTask = {
      id: generateId(),
      columnId,
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

      fetchTaskList();
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

      fetchTaskList();
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

  const updateTask = async (taskId, content) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/board/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task');
      }

      fetchTaskList();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update task');
    }
  };

  console.log(error);
  console.log(loading);
  return (
    <div className="border p-2 flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden ">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className=" p-2 flex gap-2 border border-transparent hover:border-white h-fit"
            onClick={() => {
              createNewColumn();
            }}
          >
            <PlusIcon /> Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} updateTask={updateTask} deleteTask={deleteTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  // function createNewColumn() {
  //   const columnToAdd = {
  //     id: generateId(),
  //     title: `Column ${columns.length + 1}`,
  //   };

  //   setColumns([...columns, columnToAdd]);
  // }

  // function deleteColumn(id) {
  //   const newTasks = columns.filter((col) => col.id !== id);
  //   setColumns(newTasks);

  //   const deleteTask = tasks.filter((task) => task.id !== id);
  //   setTasks(deleteTask);
  // }

  // function updateTask(taskId, content) {
  //   const updateTask = tasks.map((task) => {
  //     if (task.id !== taskId) return task;
  //     return { ...task, content };
  //   });
  //   setTasks(updateTask);
  // }

  // function updateColumn(id, title) {
  //   const newColumns = columns.map((col) => {
  //     if (col.id !== id) return col;
  //     return { ...col, title };
  //   });
  //   setColumns(newColumns);
  // }

  // update column

  // function createTask(columnId) {
  //   const newTask = {
  //     id: generateId(),
  //     columnId,
  //     content: `Task ${tasks.length + 1}`,
  //   };

  //   setTasks([...tasks, newTask]);
  // }

  function onDragStart(event) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  }

  async function onDragEnd(event) {
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
      const activeIndex = columns.findIndex((col) => col.id === activeId);
      const overIndex = columns.findIndex((col) => col.id === overId);

      if (activeIndex === -1 || overIndex === -1) return;

      const updatedColumns = arrayMove([...columns], activeIndex, overIndex).map((col, index) => ({
        ...col,
        order: index,
      }));

      try {
        const response = await fetch('/api/board/column/updateOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedColumns),
        });

        if (!response.ok) {
          throw new Error('Failed to update columns order');
        }

        setColumns(updatedColumns);
      } catch (error) {
        console.error('Error updating columns order:', error);
      }
    } else if (isActiveATask) {
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

        try {
          setLoading(true);
          const response = await fetch(`/api/board/task/updateColumnAndOrder/${activeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ columnId: newColumnId, order: newOrder }),
          });

          setError(false);
          setLoading(false);
          if (!response.ok) {
            throw new Error('Failed to update task order');
          }

          const updatedTask = await response.json();
          setActiveTask(updatedTask); // Refresh tasks after updating order
        } catch (error) {
          console.error('Error updating task order:', error);
          setError(error);
          setLoading(false);
        }
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

        try {
          setLoading(true);
          const response = await fetch(`/api/board/task/updateColumnAndOrder/${activeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ columnId: activeTask.columnId, order: newOrder }),
          });

          setError(false);
          setLoading(false);
          if (!response.ok) {
            throw new Error('Failed to update task order');
          }

          const updatedTask = await response.json();
          setActiveTask(updatedTask); // Refresh tasks after updating order
        } catch (error) {
          console.error('Error updating task order:', error);
          setError(error);
          setLoading(false);
        }
      } else {
        // Handle the scenario when overTask is undefined (dropped in empty space within the same column)
        // You can add any specific logic or handling here, if needed
        return;
      }
    }
  }

  async function onDragOver(event) {
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

        try {
          await fetch(`/api/board/task/updateColumnAndOrder/${activeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ columnId: newColumnId, order: newOrder }),
          });
        } catch (error) {
          console.error('Error updating task:', error);
        }
      } else if (isOverAColumn) {
        const newColumnId = overId;
        const tasksInNewColumn = tasks.filter((task) => task.columnId === newColumnId);
        const newOrder = tasksInNewColumn.length + 1;

        setTasks((tasks) =>
          tasks.map((task) => (task.id === activeId ? { ...task, columnId: newColumnId, order: newOrder } : task))
        );

        try {
          await fetch(`/api/board/task/updateColumnAndOrder/${activeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ columnId: newColumnId, order: newOrder }),
          });
        } catch (error) {
          console.error('Error updating task:', error);
        }
      }
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 100001);
}

export default Board;
