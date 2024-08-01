import makeAnimated from 'react-select/animated';
import useGetUser from '../api/users/useGetUsers';
import useUpdateTask from '../api/task/useUpdateTask';
import { priorityOptions } from '../constants/board';
import useHandleUpdateTask from '../hooks/board/useHandleUpdateTask';
import { FormHeader, Input, CustomSelect, FormContainer, Button, TextArea } from '../components';
import ToastProvider from '../configs/ToastProvider';
import { selectStyle } from '../helpers/selectStyle';


const UpdateTask = ({ taskitem,  handleDrawerClose }) => {
  const { updateTask, toastMessage, toastType, clearToast } = useUpdateTask();  
  const onUpdate = (id, update, date, selectedMembers, priority, desc) => {
    updateTask(id, update, date, selectedMembers, priority, desc);
  };

  const animatedComponents = makeAnimated();
  const { loading, error, members, fetchMembers } = useGetUser();
  const { update, membersOptions, handleMemberSelectChange, handlePriorityChange, handleUpdate, handleChange } =
    useHandleUpdateTask(taskitem, onUpdate, members, fetchMembers);

  const taskInfoFirstRow = (
    <>
      <Input
        type="text"
        label="Task Title"
        value={update.content}
        id="content"
        onChange={handleChange}
        validation="Enter the title of the task"
      />
      <Input
        type="date"
        label="Due date"
        id="dueDate"
        value={update.dueDate || ''}
        onChange={handleChange}
        validation="Enter the task deadline in mm-dd-yyyy"
      />
      <CustomSelect
        label="Task Priority Level"
        validation="Select the task priority level"
        options={priorityOptions}
        value={priorityOptions.find((option) => option.value === update.priority)}
        onChange={handlePriorityChange}
      />
    </>
  );

  const taskInfoSecondRow = (
    <>
      {loading ? (
        <div className="h-14 w-full bg-blue1 animate-pulse" />
      ) : error ? (
        <p>Error fetching members</p>
      ) : (
        <CustomSelect
          label="Assign Tasks to"
          value={update.assignedUsers}
          options={membersOptions}
          onChange={handleMemberSelectChange}
          style={selectStyle}
          validation="Select the name/s of the task recipient"
          isMulti={true}
          closeMenuOnSelect={false}
          components={animatedComponents}
        />
      )}
    </>
  );

  return (
    <div className="bg-white0 min-w-fit min-h-full p-7">
      <form onSubmit={handleUpdate} className="flex flex-col gap-2">
        <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast}/>
        <FormHeader title="Update Task" />
        <FormContainer gridColsClass="grid-cols-3">{taskInfoFirstRow}</FormContainer>
        <FormContainer gridColsClass="grid-cols-1">{taskInfoSecondRow}</FormContainer>
        <hr className="bg-gray1 my-4" />
        <TextArea 
        label="Task Description"
        id="desc"
        value={update.desc}
        onChange={handleChange}
        validation="Please enter the task description. Max 200 characters."
        />

        <hr className="bg-gray1 my-5" />
        <div className="flex justify-end mt-4 gap-2.5 p-2.5">
          <Button type="button" variant="secondary" onClick={handleDrawerClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
