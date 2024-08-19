import { useEffect, useState } from 'react';
import moment from 'moment';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoCalendarClearOutline } from 'react-icons/io5';

function TaskCard({ task, handleDeleteTask, openTask, openDrawer }) {
  const [taskState, setTaskState] = useState({
    editMode: false,
    content: task.content,
    assignedUsers: task.assignedUsers,
    priority: task.priority,
    desc: task.desc,
    dueDate: '',
    isOverdue: false,
  });

  useEffect(() => {
    const now = moment().startOf('day');
    const dueDateMoment = moment(task.dueDate).startOf('day');
    const daysUntilDue = dueDateMoment.diff(now, 'days');

    let formattedDate;
    if (daysUntilDue === 1) {
      formattedDate = 'Tomorrow';
    } else if (daysUntilDue <= 7 && daysUntilDue >= 0) {
      formattedDate = dueDateMoment.format('dddd');
    } else {
      formattedDate = dueDateMoment.format('MMM D');
    }

    setTaskState((prevState) => ({
      ...prevState,
      content: task.content,
      assignedUsers: task.assignedUsers,
      priority: task.priority,
      desc: task.desc,
      dueDate: formattedDate,
      isOverdue: dueDateMoment.isBefore(now),
    }));
  }, [task]);

  const toggleEditMode = () => {
    setTaskState((prevState) => ({
      ...prevState,
      editMode: openDrawer,
    }));

    const formattedTask = { ...task };
    if (task.dueDate) {
      formattedTask.dueDate = moment(task.dueDate).format('YYYY-MM-DD');
    }
    openTask(formattedTask);
  };

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: taskState.editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteDrawer = (e) => {
    e.stopPropagation();
    if (typeof handleDeleteTask === 'function') {
      handleDeleteTask(task);
    } else {
      console.error('handleDeleteTask is not a function', handleDeleteTask);
    }
  };

  const status =
    taskState.priority === 1
      ? 'Urgent'
      : taskState.priority === 2
        ? 'High'
        : taskState.priority === 3
          ? 'Medium'
          : taskState.priority === 4
            ? 'Low'
            : '';

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="group opacity-50 relative p-2.5 h-[200px] min-h-[200px] items-center flex text-left border-2 bg-gray2 cursor-grab"
      />
    );
  }

  return (
    <section>
      <div
        onClick={toggleEditMode}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="group relative p-2.5 h-[200px]  min-h-[200px] bg-white0 flex flex-col justify-between gap-2  text-left shadow-md border rounded-lg cursor-grab"
      >
        <div>
          <small className={`${status} font-medium flex w-fit px-2 py-1 rounded-full`}>{status}</small>
        </div>
        <div>
          <div className=" w-full pr-4 font-bold">{taskState.content}</div>
          <div
            className="w-full pr-4 text-sm overflow-hidden text-gray1"
            style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}
          >
            {taskState.desc}
          </div>
        </div>

        <div className="flex  justify-between w-full items-center h-[38px]">
          {taskState.dueDate === 'Invalid date' ? (
            <IoCalendarClearOutline />
          ) : (
            <small
              className={`bg-transparent due-date px-2 py-1 rounded-full font-semibold ${
                taskState.isOverdue ? 'text-rose-300' : ''
              }`}
            >
              {taskState.dueDate}
            </small>
          )}
          <div className="flex items-start -space-x-4 ">
            {taskState.assignedUsers.map((au) => (
              <div className="avatar" key={au.username}>
                <div className="rounded-full size-8">
                  <img src={au.img} alt="" className="" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleDeleteDrawer}
          className="hidden group-hover:block absolute right-4 top-1/2 -translate-y-1/2 px-1 py-2 stroke-gray-500 hover:stroke-white rounded-full hover:bg-columnBackGroundColor"
        >
          <TrashIcon />
        </button>
      </div>
    </section>
  );
}

export default TaskCard;
