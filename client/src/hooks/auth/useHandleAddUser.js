import { useState } from "react";

const useHandleAddUser = (addUser) => {
  const [signUpData, setSignUpData] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);

  const handleChangeRole = (selectedOption) => {
    setSelectedRole(selectedOption);
    setSignUpData({ ...signUpData, role: selectedOption ? selectedOption.value : '' });
  };

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(signUpData);
  };

  return { selectedRole, handleChange, handleChangeRole, handleSubmit}
}

export default useHandleAddUser;
