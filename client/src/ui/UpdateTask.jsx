import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const UpdateTask = ({ taskitem, onUpdate }) => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [update, setUpdate] = useState({ content: '', dueDate: '', assignedUsers: [] });
  const animatedComponents = makeAnimated();

  useEffect(() => {
    setUpdate({
      content: taskitem.content,
      dueDate: taskitem.dueDate,
      assignedUsers: taskitem.assignedUsers.map((user) => ({
        label: user.username,
        value: user.img,
      })),
    });
  }, [taskitem]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/manager/members', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchMembers();
  }, []);

  const options = members.map((member) => ({
    label: member.username,
    value: member.profilePicture,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions || []);
    setUpdate((prevState) => ({
      ...prevState,
      assignedUsers: selectedOptions || [],
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formattedMembers = selectedMembers.map((member) => ({
      username: member.label,
      img: member.value,
    }));
    onUpdate(taskitem.id, update.content, update.dueDate, formattedMembers);
    console.log(formattedMembers);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-slate-400 h-screen w-1/3 text-slate-500">
      <form onSubmit={handleUpdate} className=" flex flex-col gap-2">
        <input value={update.content} name="content" type="text" onChange={handleChange} />
        <input type="date" name="dueDate" value={update.dueDate || ''} onChange={handleChange} />

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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UpdateTask;
