import { Input, Button, FormHeader } from '../components';
import { useSelector } from 'react-redux';

const ProfileForm = ({ handleDataChange }) => {
  const { currentUser, loading } = useSelector((state) => state.user);

  return (
    <div className="mt-8 md:mt-0 space-y-2 px-10">
      <FormHeader title="Account Information" />
      <Input
        id="username"
        type="text"
        placeholder="Username"
        defaultValue={currentUser.username}
        onChange={handleDataChange}
      />

      <Input id="email" type="email" placeholder="Email" defaultValue={currentUser.email} onChange={handleDataChange} />

      <Input
        id="password"
        type="password"
        placeholder="Password"
        defaultValue={currentUser.password}
        onChange={handleDataChange}
      />

      <Button variant="primary" loading={loading}>
        {loading ? 'Loading' : 'Update'}
      </Button>
    </div>
  );
};

export default ProfileForm;
