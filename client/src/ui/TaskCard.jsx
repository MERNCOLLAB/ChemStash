import { useEffect, useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskCard({ task, deleteTask, openTask }) {
  const [editMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(task.content);
  const [au, setAu] = useState(task.assignedUsers);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  useEffect(() => {
    setContent(task.content);
    setAu(task.assignedUsers);
    setPriority(task.priority);
    setDueDate(task.dueDate);
  }, [task]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    openTask(task);
  };

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
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
        className="group opacity-50 relative bg-gray-950 p-2.5 h-[100px] min-h-[100px] items-center flex text-left border-2 border-indigo-500 cursor-grab"
      ></div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative bg-gray-950 p-2.5 h-[100px] min-h-[130px] flex flex-col text-left hover:ring-2 hover:ring-gray-400 ring-inset cursor-grab"
    >
      <p>
        {priority === 1
          ? 'Urgent'
          : priority === 2
            ? 'High Priority'
            : priority === 3
              ? 'Medium'
              : priority === 4
                ? 'Low'
                : ''}
      </p>

      <p className="my-auto w-full pr-4">{content}</p>
      <div className="flex flex-col">
        <div className="">{dueDate}</div>

        <div className="flex items-start -space-x-4 flex-1">
          {au.map((au) => (
            <div className="avatar" key={au.username}>
              <div className="rounded-full w-10 h-10">
                <img src={au.img} alt="" className="" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="hidden group-hover:block absolute right-4 top-1/2 -translate-y-1/2 px-1 py-2 stroke-gray-500 hover:stroke-white rounded-full hover:bg-columnBackGroundColor"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

export default TaskCard;
