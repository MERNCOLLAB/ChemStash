import { useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskCard({ task, deleteTask, updateTask }) {
  const [editMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(task.content);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      toggleEditMode();
    }
  };

  const handleBlur = () => {
    updateTask(task.id, content);
    toggleEditMode();
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

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="group relative bg-gray-950 p-2.5 h-[100px] min-h-[100px] items-center flex text-left hover:ring-2 hover:ring-gray-400 ring-inset cursor-grab"
      >
        <textarea
          className="border  h-[90%] w-full resize-none border-none  text-gray-300 focus:outline-none  bg-indigo-700"
          value={content}
          autoFocus
          placeholder="Task content  here"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    );
  }
  if (editMode === false) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="group relative bg-gray-950 p-2.5 h-[100px] min-h-[100px] items-center flex text-left hover:ring-2 hover:ring-gray-400 ring-inset cursor-grab"
      >
        <p className=" my-auto h-[90%] overflow-x-hidden overflow-y-auto whitespace-pre-wrap w-full pr-4">
          {task.content}
        </p>

        <button
          onClick={() => deleteTask(task.id)}
          className="hidden  group-hover:block absolute right-4 top-1/2 -translate-y-1/2  px-1 py-2 stroke-gray-500 hover:stroke-white rounded-full hover:bg-columnBackGroundColor"
        >
          <TrashIcon />
        </button>
      </div>
    );
  }
}

export default TaskCard;
