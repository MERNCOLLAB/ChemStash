import useDeleteColumn from '../api/board/useDeleteColumn';
import { FormHeader, Button } from '../components';
import ToastProvider from '../configs/ToastProvider';

const DeleteColumn = ({ columnItem, handleDrawerClose }) => {
  const { loading, deleteColumn, toastMessage, toastType, clearToast } = useDeleteColumn();

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    deleteColumn(columnItem.id);
  };

  return (
    <div className="bg-white0 w-[49%] min-w-fit min-h-full p-7">
      <form onSubmit={handleConfirmDelete}>
        <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast} />
        <FormHeader title="Delete Board Column" />
        <h1>
          Are you sure you want to delete <span className="font-semibold">{columnItem.title}</span>
          &nbsp; board column ?
        </h1>
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

export default DeleteColumn;
