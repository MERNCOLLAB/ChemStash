import ToastProvider from '../configs/ToastProvider';
import { roleOptions } from '../constants';
import { Button, CustomSelect, FormHeader, FormSubHeader, FormContainer, Input } from '../components';
import useAddUser from '../api/auth/useAddUser';
import useHandleAddUser from '../hooks/auth/useHandleAddUser';

function SignUp({handleDrawerClose}) {
  const {loading, error, addUser, toastMessage, toastType, clearToast} = useAddUser();
  const {selectedRole, handleChange, handleChangeRole, handleSubmit} = useHandleAddUser(addUser);

  const userInfoFirstRow = (
    <>
       <Input
          type="text"
          disabled={loading}
          id="username"
          label="Username"
          placeholder="Enter username"
          onChange={handleChange}
          validation="Provide appropriate username"
        />
        
      <Input
        type="email"
        disabled={loading}
        id="email"
        label="Email"
        placeholder="Enter e-mail"
        onChange={handleChange}
        validation="Enter a valid e-mail address"
      />
    </>
  )

  const userInfoSecondRow = (
    <>
     <CustomSelect
        label="User Role"
        validation="Select the user role"
        placeholder="Select a role"
        value={selectedRole}
        options={roleOptions}
        onChange={handleChangeRole}
      />

      <Input
      type="password"
      disabled={loading}
      id="password"
      label="Password"
      placeholder="Enter password"
      onChange={handleChange}
      validation="Enter the user's password"
      />
    </>
  )
  return (
      <form onSubmit={handleSubmit} className="p-7 min-w-[49%] min-h-full bg-white0">
      <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast}/>
      <FormHeader title="Add User" />
      <FormSubHeader title="Basic Info" subtitle="Basic information of the new user" />
      <FormContainer gridColsClass="grid-cols-2">{userInfoFirstRow}</FormContainer>
      <FormContainer gridColsClass="grid-cols-2">{userInfoSecondRow}</FormContainer>
      <hr className="bg-gray1 my-5" />
      <div className="flex justify-end mt-4 gap-2.5 p-2.5">
        <Button type="button" variant="secondary" onClick={handleDrawerClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add
        </Button>
        <p className="text-red-700">{error && 'Something went wrong!'}</p>
      </div>
      </form>

  );
}

export default SignUp;
