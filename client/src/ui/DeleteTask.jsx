import { FormHeader, Button } from '../components';
import ToastProvider from '../configs/ToastProvider';
import useDeleteTask from '../api/task/useDeleteTask';

const DeleteTask = ({ taskitem, handleDrawerClose }) => {
  const { loading, deleteTask, toastType, toastMessage, clearToast } = useDeleteTask();

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    deleteTask(taskitem.id);
  };

  return (
    <div className="bg-white0 w-[50%] min-h-full p-7">
      <form onSubmit={handleConfirmDelete} className="flex flex-col gap-2">
        <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast} />
        <FormHeader title="Delete Task" />
        <h1>
          Are you sure you want to delete <span className="font-semibold">{taskitem.content}</span>?
        </h1>
        <div className="flex flex-col my-2">
          <div className="w-full min-w-xl m-2">
            <h1 className="font-semibold">Description</h1>
            <p className="text-sm">{taskitem.desc}</p>
          </div>
          <div className="m-2">
            <h1 className="font-semibold">Assigned Task to:</h1>
            <div className="mt-4">
              {taskitem.assignedUsers.map((user) => (
                <div className="avatar" key={user.username}>
                  <div className="rounded-full size-8">
                    <img src={user.img} alt="" className="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="bg-gray1 my-5" />
        <div className="flex justify-end mt-4 gap-2.5 p-2.5">
          <Button type="button" variant="secondary" onClick={handleDrawerClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeleteTask;
