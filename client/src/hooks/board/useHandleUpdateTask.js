import { useState, useEffect } from 'react';

const useHandleUpdateTask = (taskitem, onUpdate, members, fetchMembers) => {
  const [update, setUpdate] = useState({
    content: '',
    dueDate: '',
    assignedUsers: [],
    priority: null,
    desc: '',
  });
  const handleMemberSelectChange = (selectedOptions) => {
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
    const { id, value } = e.target;
    setUpdate((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const membersOptions = members.map((member) => ({
    label: member.username,
    value: member.profilePicture,
  }));
  return {
    update,
    membersOptions,
    handleMemberSelectChange,
    handlePriorityChange,
    handleUpdate,
    handleChange,
  };
};

export default useHandleUpdateTask;
