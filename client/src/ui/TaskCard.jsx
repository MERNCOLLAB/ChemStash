import { useEffect, useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskCard({ task, deleteTask, openTask }) {
  const [editMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(task.content);
  useEffect(() => {
    setContent(task.content);
  }, [task.content]);
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

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault();

  //     toggleEditMode();
  //   }
  // };

  // const openTask = (e) => {
  //   e.preventDefault();
  //   updateTask(task.id, content);
  //   toggleEditMode();
  // };

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
      // onClick={toggleEditMode}
      className="group relative bg-gray-950 p-2.5 h-[100px] min-h-[100px] items-center flex text-left hover:ring-2 hover:ring-gray-400 ring-inset cursor-grab"
    >
      <p className=" my-auto h-[90%] overflow-x-hidden overflow-y-auto whitespace-pre-wrap w-full pr-4">{content}</p>

      <button
        onClick={() => deleteTask(task.id)}
        className="hidden  group-hover:block absolute right-4 top-1/2 -translate-y-1/2  px-1 py-2 stroke-gray-500 hover:stroke-white rounded-full hover:bg-columnBackGroundColor"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

export default TaskCard;
