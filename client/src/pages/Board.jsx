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
    });
    socket.on('columnOrderUpdated', (updatedColumns) => {
      setColumns(updatedColumns);
    });

    socket.on('columnTitleUpdated', (updatedColumn) => {
      setColumns((prevColumns) => prevColumns.map((col) => (col.id === updatedColumn.id ? updatedColumn : col)));
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

  useEffect(() => {
    fetchColumnList();
  }, []);
  // create column
  const createNewColumn = async () => {
    const columnToAdd = {
      id: generateId(), // Assuming generateId() generates a unique ID
      title: `Column ${columns.length + 1}`,
      order: columns.length + 1, // Assuming you maintain an order based on the number of columns
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

      setColumns((prevColumns) => prevColumns.map((col) => (col.id === id ? { ...col, title } : col)));
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Failed to update column title');
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

  function deleteTask(taskId) {
    const filteredTask = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTask);
  }

  function updateTask(taskId, content) {
    const updateTask = tasks.map((task) => {
      if (task.id !== taskId) return task;
      return { ...task, content };
    });
    setTasks(updateTask);
  }

  // function updateColumn(id, title) {
  //   const newColumns = columns.map((col) => {
  //     if (col.id !== id) return col;
  //     return { ...col, title };
  //   });
  //   setColumns(newColumns);
  // }

  // update column

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

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
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      const updatedColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);

      // Update columns order in backend
      fetch('/api/board/column/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedColumns),
      });

      return updatedColumns;
    });
  }

  async function onDragOver(event) {
    const { active, over } = event;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;
    // dropping task over a task

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;

          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';
    // dropping task to another column

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 100001);
}

export default Board;
