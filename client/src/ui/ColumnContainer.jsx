import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import TaskCard from '../ui/TaskCard';

function ColumnContainer(props) {
  const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask, currentUser } = props;
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

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackGroundColor opacity-20 border-2 border-indigo-700 w-[350px] h-[500px] max-h-[500px] "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackGroundColor w-[350px] h-[500px] max-h-[500px] flex flex-col"
    >
      {/* title */}
      <div
        onClick={currentUser.role === 'chemist' ? null : () => setEditMode(true)}
        {...attributes}
        {...listeners}
        className="flex justify-between bg-mainBackGroundColor cursor-grab p-3 border-4 border-columnBackGroundColor font-bold"
      >
        <div className="flex gap-2 items-center">
          <div className="bg-columnBackGroundColor text-sm rounded-full px-2 py-1">0</div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-gray-950 px-2 py-1 focus:border-columnBackGroundColor border outline-none "
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
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
      {/* task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
        </SortableContext>
      </div>

      {/* footer */}
      {currentUser.role === 'chemist' ? null : (
        <button
          onClick={() => {
            createTask(column.id, 1);
          }}
          className=" justify-center   m-1   flex  gap-2 items-center px-1 py-2 stroke-gray-500 hover:stroke-white  hover:bg-mainBackGroundColor"
        >
          <PlusIcon />
          <div>Add task</div>
        </button>
      )}
    </div>
  );
}

export default ColumnContainer;
