import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const UpdateTask = ({ taskitem, onUpdate }) => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [update, setUpdate] = useState('');
  const [date, setDate] = useState(null);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    setUpdate(taskitem.content);
  }, [taskitem.content]);

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
    value: member.username,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions || []);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formattedMembers = selectedMembers.map((member) => ({
      username: member.label,
    }));
    onUpdate(taskitem.id, update, date, formattedMembers);
  };

  const editContent = (e) => {
    setUpdate(e.target.value);
  };

  return (
    <div className="bg-slate-400 h-screen w-1/3 text-slate-500">
      <form onSubmit={handleUpdate} className=" flex flex-col gap-2">
        <input value={update} type="text" onChange={editContent} />

        <input type="date" value={date || ''} onChange={(e) => setDate(e.target.value)} />

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
          />
        )}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UpdateTask;
