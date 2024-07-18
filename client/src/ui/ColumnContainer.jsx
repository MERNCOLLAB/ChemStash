import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { IoAdd } from 'react-icons/io5';
import TaskCard from '../ui/TaskCard';

function ColumnContainer(props) {
  const { openDrawer, openColumn, open, column, deleteColumn, createTask, tasks, deleteTask, currentUser, openTask } =
    props;
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode || currentUser.role === 'chemist',
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleEditMode = () => {
    setEditMode(openDrawer);
    openColumn(column);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackGroundColor opacity-20 border-2 border-indigo-700 w-[300px] h-[500px] max-h-[500px]"
      ></div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-gray0 w-[300px] h-[500px] max-h-[500px] flex flex-col">
      {/* title */}
      <div className="flex w-full justify-between" style={{ background: column.color }}>
        <div {...attributes} {...listeners} className={`flex justify-between w-full cursor-grab p-3 font-bold `}>
          <div
            className="flex gap-2 items-center"
            onClick={currentUser.role === 'chemist' ? null : () => toggleEditMode()}
          >
            <div className="text-sm rounded-full px-2 py-1 text-white">{tasks.length}</div>

            <p className="text-white">{column.title}</p>
          </div>
          {currentUser.role === 'chemist' ? null : (
            <button
              onClick={() => {
                deleteColumn(column.id);
              }}
              className="px-1 py-2 stroke-gray-500 hover:stroke-white rounded-full hover:bg-columnBackGroundColor"
            >
              <TrashIcon />
            </button>
          )}
        </div>
        {currentUser.role === 'chemist' ? null : (
          <button
            onClick={() => {
              createTask(column.id, 1);
            }}
            className="justify-center m-1 flex gap-2 items-center px-1 py-2 stroke-gray-500 hover:stroke-white hover:bg-mainBackGroundColor"
          >
            <IoAdd />
          </button>
        )}
      </div>
      {/* task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              open={open}
              openTask={openTask}
              openDrawer={openDrawer}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
