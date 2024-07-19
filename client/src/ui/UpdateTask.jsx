import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useGetUser from '../api/users/useGetUsers';

const UpdateTask = ({ taskitem, onUpdate }) => {
  const [update, setUpdate] = useState({
    content: '',
    dueDate: '',
    assignedUsers: [],
    priority: null,
    desc: '',
  });

  const animatedComponents = makeAnimated();
  const { loading, error, members, fetchMembers } = useGetUser();

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (taskitem && members.length > 0) {
      setUpdate({
        content: taskitem.content,
        dueDate: taskitem.dueDate,
        desc: taskitem.desc,
        assignedUsers: taskitem.assignedUsers.map((user) => ({
          label: user.username,
          value: user.img,
        })),
        priority: taskitem.priority,
      });
    }
  }, [taskitem, members]);

  const options = members.map((member) => ({
    label: member.username,
    value: member.profilePicture,
  }));

  const handleSelectChange = (selectedOptions) => {
    setUpdate((prevState) => ({
      ...prevState,
      assignedUsers: selectedOptions || [],
    }));
  };

  const handlePriorityChange = (selectedOption) => {
    setUpdate((prevState) => ({
      ...prevState,
      priority: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formattedMembers = update.assignedUsers.map((member) => ({
      username: member.label,
      img: member.value,
    }));
    onUpdate(taskitem.id, update.content, update.dueDate, formattedMembers, update.priority, update.desc);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const priorityOptions = [
    { value: 1, label: 'Urgent' },
    { value: 2, label: 'High Priority' },
    { value: 3, label: 'Medium' },
    { value: 4, label: 'Low' },
  ];

  return (
    <div className="bg-slate-400 h-screen w-1/3 text-slate-500">
      <form onSubmit={handleUpdate} className="flex flex-col gap-2">
        <Select
          options={priorityOptions}
          onChange={handlePriorityChange}
          value={priorityOptions.find((option) => option.value === update.priority)}
        />
        <input value={update.content} name="content" type="text" onChange={handleChange} />
        <input type="date" name="dueDate" value={update.dueDate || ''} onChange={handleChange} />
        <textarea name="desc" value={update.desc} onChange={handleChange}></textarea>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching members</p>
        ) : (
          <Select
            closeMenuOnSelect={false}
            isMulti
            components={animatedComponents}
            options={options}
            onChange={handleSelectChange}
            value={update.assignedUsers}
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateTask;
