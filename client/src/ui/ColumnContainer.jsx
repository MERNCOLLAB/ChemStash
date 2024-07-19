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
        className="bg-columnBackGroundColor opacity-20 border-2 border-indigo-700 w-[300px] h-[700px] min-h-[700px]"
      ></div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className=" w-[300px] h-[700px] min-h-[700px] flex flex-col gap-2">
      {/* title */}
      <div className="flex w-full  justify-between gap-1 ">
        <div
          {...attributes}
          {...listeners}
          className={`group flex justify-between w-full cursor-grab  font-bold px-[10px] rounded-lg shadow-md`}
          style={{ background: column.color }}
        >
          <div
            className="flex gap-2 items-center"
            onClick={currentUser.role === 'chemist' ? null : () => toggleEditMode()}
          >
            <div className="text-sm rounded-full px-[.75rem] py-[.3rem] bg-white0" style={{ color: column.color }}>
              {tasks.length}
            </div>

            <p className="text-white">{column.title}</p>
          </div>
          {currentUser.role === 'chemist' ? null : (
            <button
              onClick={() => {
                deleteColumn(column.id);
              }}
              className="  :px-1 py-2 group-hover:stroke-white0 hover:stroke-white rounded-full "
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
            className="justify-center px-3 py-2 flex gap-2 items-center  bg-white0 rounded-lg    shadow-md "
            style={{ color: column.color }}
          >
            <IoAdd className="text-md  " />
          </button>
        )}
      </div>
      {/* task container */}
      <div className="flex flex-grow flex-col gap-2  overflow-x-hidden overflow-y-auto">
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
